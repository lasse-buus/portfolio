import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const pad = (n) => String(n).padStart(2, "0");

const Chevron = ({ dir = "right" }) => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		{dir === "right" ? <path d="M6 3l5 5-5 5" /> : <path d="M10 3L5 8l5 5" />}
	</svg>
);

/**
 * Photo carousel: one large stage (swipe / arrows / keys) + thumbnail strip.
 * images: [{ key, src, thumb, original, alt, width, height }]
 */
export default function Carousel({ images = [], zoom = false }) {
	const trackRef = useRef(null);
	const thumbsRef = useRef(null);
	const [current, setCurrent] = useState(0);
	const count = images.length;

	const goTo = useCallback(
		(index) => {
			const track = trackRef.current;
			if (!track || !count) return;
			const next = Math.max(0, Math.min(count - 1, index));
			track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
		},
		[count]
	);

	// Keep the counter in sync with swipes and scrolls
	const onScroll = () => {
		const track = trackRef.current;
		if (!track || !track.clientWidth) return;
		const index = Math.round(track.scrollLeft / track.clientWidth);
		if (Number.isFinite(index) && index !== current) setCurrent(index);
	};

	// Stay on the same photo when the window is resized
	const currentRef = useRef(0);
	currentRef.current = current;
	useEffect(() => {
		const track = trackRef.current;
		if (!track || typeof ResizeObserver === "undefined") return;
		let lastWidth = track.clientWidth;
		const ro = new ResizeObserver(() => {
			const width = track.clientWidth;
			if (!width || width === lastWidth) return;
			lastWidth = width;
			track.scrollTo({ left: currentRef.current * width, behavior: "auto" });
		});
		ro.observe(track);
		return () => ro.disconnect();
	}, []);

	// Keep the active thumbnail visible in the strip
	useEffect(() => {
		const strip = thumbsRef.current;
		const thumb = strip?.children?.[current];
		if (!strip || !thumb) return;
		const left = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
		strip.scrollTo({ left, behavior: "smooth" });
	}, [current]);

	const onKeyDown = (e) => {
		if (e.key === "ArrowRight") {
			e.preventDefault();
			goTo(current + 1);
		}
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			goTo(current - 1);
		}
	};

	if (!count) return null;

	const renderSlide = (img, i) => {
		const photo = (
			<Image
				src={img.src}
				alt={img.alt}
				fill
				priority={i === 0}
				sizes="(max-width: 1240px) 100vw, 1200px"
				quality={80}
				className="object-contain"
			/>
		);

		if (!zoom) {
			return (
				<div key={img.key} className="carousel-slide" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>
					{photo}
				</div>
			);
		}

		return (
			<Item key={img.key} original={img.original} thumbnail={img.thumb} width={img.width} height={img.height} alt={img.alt}>
				{({ ref, open }) => (
					<div className="carousel-slide" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>
						<button
							type="button"
							ref={ref}
							onClick={open}
							className="absolute inset-0 w-full h-full cursor-zoom-in"
							aria-label={`Open ${img.alt} in full screen`}
						>
							{photo}
						</button>
					</div>
				)}
			</Item>
		);
	};

	const track = (
		<div
			ref={trackRef}
			onScroll={onScroll}
			onKeyDown={onKeyDown}
			tabIndex={0}
			className="carousel-track"
			aria-label="Photos — use arrow keys to browse"
		>
			{images.map(renderSlide)}
		</div>
	);

	const arrowClass =
		"inline-flex items-center justify-center w-10 h-10 rounded-full border border-line bg-page text-ink transition hover:border-ink disabled:opacity-30 disabled:pointer-events-none";

	return (
		<div role="region" aria-roledescription="carousel" aria-label="Trip photos">
			{/* Stage */}
			<div className="p-4 sm:p-6">
				<div className="media aspect-w-4 aspect-h-5 sm:aspect-w-3 sm:aspect-h-2">
					{zoom ? <Gallery>{track}</Gallery> : track}
				</div>
			</div>

			{/* Controls */}
			<div className="flex items-center justify-between px-4 pb-4 sm:px-6 sm:pb-6">
				<span className="label">
					<span className="text-ink">{pad(current + 1)}</span> / {pad(count)}
				</span>
				<div className="flex items-center gap-2">
					<button type="button" className={arrowClass} onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous photo">
						<Chevron dir="left" />
					</button>
					<button type="button" className={arrowClass} onClick={() => goTo(current + 1)} disabled={current === count - 1} aria-label="Next photo">
						<Chevron dir="right" />
					</button>
				</div>
			</div>

			{/* Thumbnails */}
			{count > 1 ? (
				<div className="border-t border-line">
					<div ref={thumbsRef} className="flex gap-2 px-4 py-4 overflow-x-auto sm:px-6 no-scrollbar">
						{images.map((img, i) => (
							<button
								key={`thumb-${img.key}`}
								type="button"
								onClick={() => goTo(i)}
								aria-label={`Show photo ${i + 1}`}
								aria-current={i === current ? "true" : undefined}
								className={`relative flex-none w-16 h-16 overflow-hidden rounded transition ${
									i === current ? "thumb-active" : "opacity-50 hover:opacity-100"
								}`}
							>
								<Image src={img.thumb} alt="" fill sizes="64px" className="object-cover" />
							</button>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
}
