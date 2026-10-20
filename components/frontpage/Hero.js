import React, { memo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import userData from "@constants/data";
import PlayingNow from "../spotify/PlayingNow";

/*
 * Everything decorative is placed on the 64px blueprint grid, measured
 * from the centre line, so tiles and labels sit exactly inside cells.
 */
const CELL = 64;
const cellStyle = (col, row, w = 1, h = 1) => ({
	left: `calc(50% + ${col * CELL + 1}px)`,
	top: `${row * CELL + 1}px`,
	width: `${w * CELL - 1}px`,
	height: `${h * CELL - 1}px`,
});

function OsloClock() {
	const [now, setNow] = useState(null);

	useEffect(() => {
		const tick = () => setNow(new Date());
		tick();
		const id = setInterval(tick, 15000);
		return () => clearInterval(id);
	}, []);

	const time = now
		? new Intl.DateTimeFormat("en-GB", {
				hour: "2-digit",
				minute: "2-digit",
				timeZone: "Europe/Oslo",
		  }).format(now)
		: "--:--";

	return (
		<div className="flex flex-col justify-between h-full p-4">
			<span className="label">Local time · Oslo</span>
			<span className="font-mono text-2xl font-medium tracking-tight text-ink">{time}</span>
		</div>
	);
}

function Hero({ hero }) {
	const { title, subtitle, image, imagecaption } = hero?.heroData || {};

	return (
		<section className="relative overflow-hidden rule">
			<div className="relative frame">
				{/* Blueprint grid + decoration (desktop) */}
				<div aria-hidden="true" className="absolute inset-0 blueprint" />
				<div aria-hidden="true" className="absolute inset-0 hidden pointer-events-none lg:block">
					<span className="absolute flex items-center justify-center label" style={cellStyle(-9, 1, 2)}>
						[ 59.91° N ]
					</span>
					<span className="absolute flex items-center justify-center label" style={cellStyle(7, 1, 2)}>
						[ 10.75° E ]
					</span>
					<span className="absolute bg-brand" style={cellStyle(-9, 3)} />
					<span className="absolute opacity-10 bg-brand-ink" style={cellStyle(-8, 4)} />
					<span className="absolute opacity-10 bg-brand-ink" style={cellStyle(8, 2)} />
					<span className="absolute opacity-5 bg-brand-ink" style={cellStyle(7, 5)} />
					<span className="absolute flex items-center justify-center label" style={cellStyle(-9, 6, 2)}>
						[ 1240 ]
					</span>
					<span className="absolute flex items-center justify-center label" style={cellStyle(7, 6, 2)}>
						[ 12 col ]
					</span>
				</div>

				{/* Grid-aligned tiles (desktop) */}
				<div className="absolute hidden border xl:block border-line bg-page" style={cellStyle(-9, 8, 4, 2)}>
					<PlayingNow />
				</div>
				<div className="absolute hidden border xl:block border-line bg-page" style={cellStyle(5, 8, 4, 2)}>
					<OsloClock />
				</div>

				{/* Content */}
				<div className="relative flex flex-col items-center px-4 pt-14 pb-16 text-center sm:px-6 md:pt-20 md:pb-20">
					<span className="inline-flex items-center gap-2 px-3 text-xs font-medium border rounded-full h-8 border-line bg-page text-muted">
						<span className="w-1.5 h-1.5 rounded-full bg-brand-ink" />
						{userData.role}
						<span className="text-faint">·</span>
						{userData.address}
					</span>

					<p className="mt-8 text-lg font-medium md:text-2xl text-ink">Hey there, I&apos;m Lasse Buus</p>
					<h1 className="mt-2 text-[44px] leading-[1] sm:text-6xl md:text-[88px] md:leading-[0.95] font-bold tracking-tight text-ink">
						{title}
						{subtitle ? (
							<>
								{" "}
								<span className="text-faint">&amp;</span> {subtitle}
							</>
						) : null}
						<span className="text-brand-ink">.</span>
					</h1>

					{image?.url ? (
						<figure className="relative mt-10 w-[248px] md:w-[280px] p-2 pb-0 bg-page border border-line rounded-md shadow-card">
							<div className="relative overflow-hidden rounded-[3px] aspect-w-4 aspect-h-5 bg-surface">
								<Image
									src={image.url}
									alt="Lasse Buus Nielsen"
									fill
									priority
									sizes="280px"
									className="object-cover"
								/>
							</div>
							<figcaption className="flex items-center justify-between px-1 py-2.5">
								<span className="label text-ink">↳ {imagecaption}</span>
								<span className="label">Oslo, NO</span>
							</figcaption>
						</figure>
					) : null}

					<p className="max-w-xl mt-10 text-[15px] md:text-base leading-relaxed text-muted">{userData.intro}</p>

					<div className="flex flex-wrap items-center justify-center gap-3 mt-8">
						<Link href="/contact" className="btn btn-solid">
							Get in touch
						</Link>
						<Link href="/about" className="btn">
							About me
						</Link>
					</div>
				</div>
			</div>

			{/* Marquee strip */}
			<div className="border-t border-line">
				<div className="overflow-hidden frame">
					<div className="flex w-max marquee">
						{[0, 1].map((copy) => (
							<ul key={copy} className="flex items-center h-11" aria-hidden={copy === 1}>
								{userData.ticker.map((item) => (
									<li key={`${copy}-${item}`} className="flex items-center label">
										<span className="px-6">{item}</span>
										<span className="text-brand-ink">✦</span>
									</li>
								))}
							</ul>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default memo(Hero);
