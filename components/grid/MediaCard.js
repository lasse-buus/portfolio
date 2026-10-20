import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowIcon } from "./Section";

// Literal class names so Tailwind's JIT picks them up
const RATIOS = {
	"4/3": "aspect-w-4 aspect-h-3",
	"1/1": "aspect-w-1 aspect-h-1",
	"16/9": "aspect-w-16 aspect-h-9",
};

/** Image card used in article, trip and project grids. */
export default function MediaCard({ href, src, alt = "", ratio = "4/3", eyebrow, eyebrowRight, title, priority = false }) {
	return (
		<Link href={href} className="flex flex-col p-4 sm:p-6 group">
			<div className={`media ${RATIOS[ratio] || RATIOS["4/3"]}`}>
				{src ? (
					<Image
						src={src}
						alt={alt}
						fill
						priority={priority}
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
						className="object-cover"
						quality={75}
					/>
				) : null}
			</div>
			{eyebrow || eyebrowRight ? (
				<div className="flex items-center justify-between gap-4 mt-5">
					<span className="label">{eyebrow}</span>
					{eyebrowRight ? <span className="label">{eyebrowRight}</span> : null}
				</div>
			) : null}
			<div className="flex items-start justify-between gap-6 mt-2">
				<h3 className="text-[17px] font-bold leading-snug tracking-tight text-ink">{title}</h3>
				<span className="arrow">
					<ArrowIcon />
				</span>
			</div>
		</Link>
	);
}
