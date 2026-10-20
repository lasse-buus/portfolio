import React from "react";

/** Top block for inner pages: blueprint grid, mono label, large title. */
export default function PageHeader({ label, title, description, meta, dot = true, size = "lg", children }) {
	const titleSize =
		size === "lg"
			? "text-5xl md:text-[72px] md:leading-[1]"
			: "text-4xl md:text-[52px] md:leading-[1.05]";

	return (
		<section className="relative overflow-hidden rule">
			<div className="relative frame">
				<div aria-hidden="true" className="absolute inset-0 blueprint" />
				<div className="relative px-4 pt-14 pb-12 sm:px-6 md:pt-20 md:pb-16">
					<div className="flex flex-wrap items-center gap-x-4 gap-y-1">
						<span className="label text-ink">[ {label} ]</span>
						{meta ? <span className="label">{meta}</span> : null}
					</div>
					<h1 className={`max-w-4xl mt-5 font-bold tracking-tight text-ink ${titleSize}`}>
						{title}
						{dot ? <span className="text-brand-ink">.</span> : null}
					</h1>
					{description ? (
						<p className="max-w-xl mt-5 text-base leading-relaxed text-muted">{description}</p>
					) : null}
					{children}
				</div>
			</div>
		</section>
	);
}
