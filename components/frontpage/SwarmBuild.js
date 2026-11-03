import { useEffect, useState } from "react";

/*
 * A swarm of multiplayer-style cursors that builds the front page.
 *
 * pages/_document.js marks <html data-swarm="pending"> before first paint,
 * which hides <main> and <footer> (styles/globals.css). This component then
 * walks the real, server-rendered DOM and turns every painted element into
 * a task: boxes are dragged out with a crosshair, text is typed line by line
 * behind an I-beam and media sweeps in. Revealing an element just flips it
 * to `visibility: visible`; nothing is cloned, so the page stays the page.
 *
 * Tasks unlock top-down as they scroll into view; children wait for their
 * parent box. The more is waiting on screen, the faster the swarm works and
 * the more cursors join. Esc or "Skip" shows everything at once.
 */

const CREW = [
	["Lasse", "#e5484d"],
	["Kern", "#0090ff"],
	["Pixel", "#30a46c"],
	["Grid", "#f76b15"],
	["Mono", "#8e4ec6"],
	["Bezier", "#d6409f"],
	["Snap", "#12a594"],
	["Nudge", "#3e63dd"],
	["Serif", "#e54666"],
	["Vector", "#46a758"],
	["Hex", "#ab4aba"],
	["Ruler", "#0d74ce"],
];
const START_CURSORS = 6;
const MAX_CURSORS = CREW.length;
const MEDIA = new Set(["IMG", "SVG", "svg", "VIDEO", "CANVAS", "PICTURE", "IFRAME"]);
const STOP = Symbol("swarm-stop");

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const easeOut = (t) => 1 - (1 - t) ** 3;

function alpha(color) {
	if (!color || color === "transparent") return 0;
	const rgb = color.match(/rgba?\(([^)]+)\)/);
	if (rgb) {
		const parts = rgb[1].split(/[\s,/]+/).filter(Boolean);
		return parts.length > 3 ? parseFloat(parts[3]) : 1;
	}
	const slash = color.match(/\/\s*([\d.]+)/);
	return slash ? parseFloat(slash[1]) : 1;
}

function hasPaint(cs) {
	if (alpha(cs.backgroundColor) > 0 || cs.backgroundImage !== "none" || cs.boxShadow !== "none") return true;
	return ["Top", "Right", "Bottom", "Left"].some(
		(side) => parseFloat(cs[`border${side}Width`]) > 0 && alpha(cs[`border${side}Color`]) > 0
	);
}

const hasOwnText = (el) =>
	Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());

/** Walk the page and list everything that paints, in document order. */
function collectTasks(roots) {
	const tasks = [];
	const visit = (el, parent) => {
		const cs = getComputedStyle(el);
		if (cs.display === "none") return;

		let kind = null;
		let atomic = false;
		if (MEDIA.has(el.tagName)) {
			kind = "media";
			atomic = true;
		} else if (cs.animationName !== "none") {
			kind = "box"; // e.g. the marquee: build it as one moving piece
			atomic = true;
		} else if (hasOwnText(el)) {
			kind = hasPaint(cs) ? "box" : "text"; // buttons and pills fade in whole
			atomic = true;
		} else if (hasPaint(cs)) {
			kind = "box";
		}

		let task = parent;
		if (kind) {
			task = { el, kind, parent, state: "todo" };
			el.setAttribute("data-swarm-t", "");
			tasks.push(task);
		}
		if (!atomic) for (const child of el.children) visit(child, task);
	};
	roots.forEach((root) => Array.from(root.children).forEach((child) => visit(child, null)));
	return tasks;
}

/** Line boxes of an element's text, relative to the element. */
function textLines(el) {
	const box = el.getBoundingClientRect();
	const range = document.createRange();
	range.selectNodeContents(el);
	const rects = Array.from(range.getClientRects())
		.filter((r) => r.width > 0 && r.height > 0)
		.sort((a, b) => a.top - b.top);
	const lines = [];
	for (const r of rects) {
		const line = lines[lines.length - 1];
		if (line && r.top < line.top + (line.bottom - line.top) / 2) {
			line.left = Math.min(line.left, r.left - box.left);
			line.right = Math.max(line.right, r.right - box.left);
			line.bottom = Math.max(line.bottom, r.bottom - box.top);
		} else {
			lines.push({
				top: r.top - box.top,
				bottom: r.bottom - box.top,
				left: r.left - box.left,
				right: r.right - box.left,
			});
		}
	}
	return lines;
}

/** Show the text above `line` plus `line` up to `x` (element-local px). */
const typedClip = (line, x) =>
	`polygon(-40px -40px, calc(100% + 40px) -40px, calc(100% + 40px) ${line.top}px, ${x}px ${line.top}px, ${x}px ${line.bottom}px, -40px ${line.bottom}px)`;

const CURSOR_SVG = `
<svg class="swarm-arrow" width="18" height="22" viewBox="0 0 18 22"><path d="M2 2v15.5l4.3-4.1 2.9 6.6 2.7-1.2-2.9-6.5H15z" fill="var(--c)" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>
<svg class="swarm-cross" width="18" height="18" viewBox="0 0 18 18"><path d="M9 1v6M9 11v6M1 9h6M11 9h6" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/><path d="M9 1v6M9 11v6M1 9h6M11 9h6" stroke="var(--c)" stroke-width="1.5" stroke-linecap="round"/></svg>
<svg class="swarm-beam" width="10" height="18" viewBox="0 0 10 18"><path d="M2 1.5h6M5 1.5v15M2 16.5h6" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/><path d="M2 1.5h6M5 1.5v15M2 16.5h6" stroke="var(--c)" stroke-width="1.5" stroke-linecap="round"/></svg>`;

function startSwarm(onDone) {
	const html = document.documentElement;
	const roots = Array.from(document.querySelectorAll("main, footer"));
	const tasks = collectTasks(roots);
	const cursors = [];
	let speed = 1;
	let stopped = false;
	let lastSpawn = performance.now();

	const layer = document.createElement("div");
	layer.className = "swarm-layer";
	layer.setAttribute("aria-hidden", "true");
	document.body.appendChild(layer);
	const fitLayer = () => {
		layer.style.height = `${document.documentElement.scrollHeight}px`;
	};
	fitLayer();

	/* ---- timing: everything runs on rAF and honours `speed` ---- */
	const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));
	async function tween(ms, step) {
		let p = 0;
		let last = performance.now();
		while (p < 1) {
			await frame();
			if (stopped) throw STOP;
			const now = performance.now();
			p = Math.min(1, p + ((now - last) * speed) / ms);
			last = now;
			step(p);
		}
	}
	const wait = (ms) => tween(ms, () => {});

	/* ---- cursors ---- */
	function addCursor(x, y) {
		const [name, color] = CREW[cursors.length % CREW.length];
		const el = document.createElement("div");
		el.className = "swarm-cursor";
		el.dataset.mode = "arrow";
		el.style.setProperty("--c", color);
		el.innerHTML = `${CURSOR_SVG}<span class="swarm-name"></span>`;
		el.querySelector(".swarm-name").textContent = name;
		layer.appendChild(el);
		const c = { el, color, x, y, bend: Math.random() < 0.5 ? -1 : 1 };
		place(c, x, y);
		el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
		cursors.push(c);
		run(c);
	}
	function place(c, x, y) {
		c.x = x;
		c.y = y;
		c.el.style.transform = `translate(${x}px, ${y}px)`;
	}
	const setMode = (c, mode) => {
		c.el.dataset.mode = mode;
	};
	async function press(c, down) {
		c.el.classList.toggle("is-down", down);
		await wait(70);
	}
	async function moveTo(c, x, y) {
		const fromX = c.x;
		const fromY = c.y;
		const dist = Math.hypot(x - fromX, y - fromY);
		if (dist < 1) return;
		// a slight bow so paths look hand-moved rather than ruled
		const nx = -(y - fromY) / dist;
		const ny = (x - fromX) / dist;
		const bow = Math.min(dist * 0.12, 60) * c.bend;
		await tween(clamp(160 + dist * 0.4, 200, 700), (p) => {
			const t = easeInOut(p);
			const arc = Math.sin(Math.PI * t) * bow;
			place(c, fromX + (x - fromX) * t + nx * arc, fromY + (y - fromY) * t + ny * arc);
		});
		c.bend = -c.bend;
	}

	/* ---- building ---- */
	function docRect(el) {
		const r = el.getBoundingClientRect();
		return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
	}
	function reveal(task) {
		task.state = "done";
		if (!stopped) task.el.setAttribute("data-swarm-t", "done");
	}
	function selection(c, r, variant) {
		const sel = document.createElement("div");
		sel.className = `swarm-sel${variant ? ` is-${variant}` : ""}`;
		sel.style.setProperty("--c", c.color);
		Object.assign(sel.style, { left: `${r.x}px`, top: `${r.y}px`, width: "0px", height: "0px" });
		const size = document.createElement("span");
		size.className = "swarm-size";
		sel.appendChild(size);
		layer.insertBefore(sel, layer.firstChild); // under the cursors
		return { sel, size };
	}
	function dismiss(sel) {
		sel.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220 }).finished.then(
			() => sel.remove(),
			() => sel.remove()
		);
	}
	async function drag(c, r, variant, ms) {
		setMode(c, "cross");
		await moveTo(c, r.x, r.y);
		await press(c, true);
		const { sel, size } = selection(c, r, variant);
		try {
			await tween(ms, (p) => {
				const t = easeOut(p);
				const w = r.w * t;
				const h = r.h * t;
				sel.style.width = `${w}px`;
				sel.style.height = `${h}px`;
				size.textContent = `${Math.round(w)} × ${Math.round(h)}`;
				place(c, r.x + w, r.y + h);
			});
			await press(c, false);
		} catch (e) {
			sel.remove();
			throw e;
		}
		return sel;
	}

	async function buildBox(c, task, r) {
		if (r.h > window.innerHeight * 0.9) {
			// too tall to drag on screen: click its corner and fill it
			setMode(c, "cross");
			await moveTo(c, r.x + 8, r.y + 8);
			await press(c, true);
			await press(c, false);
		} else {
			const sel = await drag(c, r, null, clamp(220 + (r.w + r.h) * 0.25, 260, 750));
			dismiss(sel);
		}
		reveal(task);
		task.el.animate([{ opacity: 0 }], { duration: 300, easing: "ease-out" });
	}

	async function buildMedia(c, task, r) {
		const sel = await drag(c, r, "media", clamp(260 + (r.w + r.h) * 0.25, 300, 800));
		reveal(task);
		task.el.animate([{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0 0)" }], {
			duration: 550,
			easing: "ease-out",
		});
		dismiss(sel);
		await wait(250);
	}

	async function buildText(c, task, r) {
		const lines = textLines(task.el);
		if (!lines.length) return buildBox(c, task, r);
		const sel = await drag(c, r, "text", clamp(140 + r.w * 0.2, 160, 380));
		const { el } = task;
		const original = el.style.clipPath;
		el.style.clipPath = typedClip(lines[0], lines[0].left);
		reveal(task);
		setMode(c, "beam");
		const chars = el.textContent.trim().length;
		const totalWidth = lines.reduce((sum, l) => sum + (l.right - l.left), 0) || 1;
		const totalMs = clamp(chars * 30, 220, 1800);
		try {
			for (const line of lines) {
				const y = r.y + (line.top + line.bottom) / 2;
				await moveTo(c, r.x + line.left, y);
				await tween((totalMs * (line.right - line.left)) / totalWidth, (p) => {
					// type in little steps, not a smooth wipe
					const x = line.left + (line.right - line.left) * (Math.ceil(p * 40) / 40);
					el.style.clipPath = typedClip(line, x);
					place(c, r.x + x + 2, y);
				});
			}
		} finally {
			el.style.clipPath = original;
			dismiss(sel);
		}
	}

	/* ---- scheduling ---- */
	function nextTask(c) {
		const vh = window.innerHeight;
		let best = null;
		let bestScore = Infinity;
		let backlog = 0;
		for (const task of tasks) {
			if (task.state !== "todo") continue;
			const r = task.el.getBoundingClientRect();
			const onScreen = r.top < vh + 60 && r.bottom > 0;
			if (onScreen) backlog += 1;
			if (task.parent && task.parent.state !== "done") continue;
			if (r.width === 0 || r.height === 0 || r.bottom <= 0 || r.right <= 0 || r.left >= window.innerWidth) {
				reveal(task); // invisible or already scrolled past: no show needed
				continue;
			}
			if (!onScreen) continue;
			const cx = c.x - window.scrollX;
			const score = r.top + Math.abs(r.left - cx) * 0.3;
			if (score < bestScore) {
				bestScore = score;
				best = task;
			}
		}
		speed = clamp(1 + backlog / 20, 1, 4);
		// a growing pile of work on screen (e.g. fast scrolling) calls in help
		if (backlog > cursors.length * 5 && cursors.length < MAX_CURSORS && performance.now() - lastSpawn > 900) {
			lastSpawn = performance.now();
			const fromLeft = Math.random() < 0.5;
			addCursor(
				window.scrollX + (fromLeft ? -20 : window.innerWidth + 20),
				window.scrollY + Math.random() * vh
			);
		}
		return best;
	}

	async function run(c) {
		try {
			while (!stopped) {
				if (tasks.every((t) => t.state === "done")) return finish();
				fitLayer();
				const task = nextTask(c);
				if (!task) {
					// nothing in view to build: wander a little until the reader scrolls
					setMode(c, "arrow");
					await moveTo(c, c.x + (Math.random() - 0.5) * 120, c.y + (Math.random() - 0.5) * 80);
					await wait(350);
					continue;
				}
				task.state = "doing";
				try {
					const r = docRect(task.el);
					if (task.kind === "media") await buildMedia(c, task, r);
					else if (task.kind === "text") await buildText(c, task, r);
					else await buildBox(c, task, r);
				} finally {
					if (task.state !== "done") reveal(task);
				}
				setMode(c, "arrow");
			}
		} catch (e) {
			if (e !== STOP) {
				console.error(e);
				finish();
			}
		}
	}

	/* ---- lifecycle ---- */
	function cleanUp() {
		stopped = true;
		window.removeEventListener("keydown", onKey);
		tasks.forEach((t) => t.el.removeAttribute("data-swarm-t"));
	}
	function finish() {
		if (stopped) return;
		cleanUp();
		html.removeAttribute("data-swarm");
		layer
			.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, easing: "ease-out" })
			.finished.then(() => layer.remove(), () => layer.remove());
		onDone();
	}
	const onKey = (e) => {
		if (e.key === "Escape") finish();
	};
	window.addEventListener("keydown", onKey);

	html.setAttribute("data-swarm", "running");
	const cx = window.scrollX + window.innerWidth / 2;
	const cy = window.scrollY + window.innerHeight * 0.35;
	for (let i = 0; i < START_CURSORS; i += 1) {
		const angle = (i / START_CURSORS) * Math.PI * 2;
		addCursor(cx + Math.cos(angle) * 40, cy + Math.sin(angle) * 40);
	}

	return {
		finish,
		/** Stop without un-hiding the page (React may mount us again right away). */
		dispose() {
			if (stopped) return;
			cleanUp();
			html.setAttribute("data-swarm", "pending");
			layer.remove();
		},
	};
}

// Strict-mode remounts happen synchronously, so a real unmount is one where
// no new mount follows before this timer fires.
let releaseTimer = null;

export default function SwarmBuild() {
	const [running, setRunning] = useState(false);
	const [swarm, setSwarm] = useState(null);

	useEffect(() => {
		clearTimeout(releaseTimer);
		const html = document.documentElement;
		if (html.getAttribute("data-swarm") !== "pending") return undefined;
		const instance = startSwarm(() => setRunning(false));
		setSwarm(instance);
		setRunning(true);
		return () => {
			instance.dispose();
			releaseTimer = setTimeout(() => {
				if (html.getAttribute("data-swarm") === "pending") html.removeAttribute("data-swarm");
			}, 0);
		};
	}, []);

	if (!running) return null;
	return (
		<button
			type="button"
			onClick={() => swarm?.finish()}
			className="fixed z-[61] btn bottom-4 right-4 bg-page"
		>
			Skip build <span aria-hidden="true">✕</span>
		</button>
	);
}
