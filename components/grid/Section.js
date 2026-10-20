import React from "react";
import Link from "next/link";

const pad = (n) => String(n).padStart(2, "0");

/**
 * A full-bleed section that sits on the page grid:
 * rule above/below, rails left/right, crosshairs at the corners
 * and a mono index row ([ 01 / 05 ]  LABEL ........ action).
 */
export default function Section({
	id,
	index,
	total,
	label,
	title,
	description,
	action,
	children,
	className = "",
}) {
	return (
		<section id={id} className={`rule ${className}`}>
			<div className="frame cross">
				<header className="relative flex items-center justify-between h-11 px-4 border-b sm:px-6 border-line">
					<span
						aria-hidden="true"
						className="absolute top-0 bottom-0 w-[2px] -left-px bg-brand-ink"
					/>
					<span className="flex items-center gap-4 label">
						{index ? (
							<span>
								<span className="text-ink">[ {pad(index)}</span>
								{total ? <span> / {pad(total)}</span> : null}
								<span className="text-ink"> ]</span>
							</span>
						) : null}
						<span>{label}</span>
					</span>
					{action}
				</header>

				{title ? (
					<div className="px-4 pt-10 pb-8 border-b sm:px-6 md:pt-14 md:pb-10 border-line">
						<h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-[40px] md:leading-[1.1] text-ink">
							{title}
						</h2>
						{description ? (
							<p className="max-w-xl mt-3 text-[15px] leading-relaxed text-muted">
								{description}
							</p>
						) : null}
					</div>
				) : null}

				{children}
			</div>
		</section>
	);
}

/** Small mono link used in section headers ("View all →") */
export function SectionLink({ href, children, external = false }) {
	const className =
		"label text-ink inline-flex items-center gap-2 hover:text-brand-ink transition";
	const arrow = external ? "↗" : "→";

	if (external) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" className={className}>
				{children} <span aria-hidden="true">{arrow}</span>
			</a>
		);
	}

	return (
		<Link href={href} className={className}>
			{children} <span aria-hidden="true">{arrow}</span>
		</Link>
	);
}

export const ArrowIcon = ({ size = 14 }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 16 16"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.6"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M3 8h10M9 4l4 4-4 4" />
	</svg>
);
