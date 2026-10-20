import React from "react";
import { SiFigma, SiReact, SiNextdotjs, SiTailwindcss, SiSanity, SiWordpress } from "react-icons/si";
import userData from "@constants/data";
import Section, { SectionLink, ArrowIcon } from "@components/grid/Section";

const LANGUAGE_COLORS = {
	JavaScript: "#f1e05a",
	TypeScript: "#3178c6",
	PHP: "#4f5d95",
	CSS: "#663399",
	HTML: "#e34c26",
	SCSS: "#c6538c",
	Vue: "#41b883",
};

const STACK = [
	{ name: "Figma", Icon: SiFigma },
	{ name: "React", Icon: SiReact },
	{ name: "Next.js", Icon: SiNextdotjs },
	{ name: "Tailwind", Icon: SiTailwindcss },
	{ name: "Sanity", Icon: SiSanity },
	{ name: "WordPress", Icon: SiWordpress },
];

const formatDate = (iso) =>
	iso
		? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso))
		: "—";

export default function LatestCode({ repositories, index, total }) {
	const repos = repositories || [];

	return (
		<Section
			index={index}
			total={total}
			label="Code"
			action={
				<SectionLink href={`https://github.com/${userData.githubUsername}`} external>
					GitHub
				</SectionLink>
			}
		>
			{repos.length ? (
				<div className="grid cell-grid sm:grid-cols-2 lg:grid-cols-3">
					{repos.map((repo, i) => (
						<a
							key={repo.id}
							href={repo.html_url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-col p-6 transition bg-page hover:bg-surface group min-h-[208px]"
						>
							<div className="flex items-center justify-between">
								<span className="label">Repo / {String(i + 1).padStart(2, "0")}</span>
								<span className="label">{formatDate(repo.pushed_at)}</span>
							</div>
							<h3 className="mt-6 font-mono text-base font-medium break-words text-ink">{repo.name}</h3>
							<p
								className={`mt-2 text-sm leading-relaxed ${repo.description ? "text-muted" : "text-faint"}`}
								style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
							>
								{repo.description || "No description yet."}
							</p>
							<div className="flex items-center justify-between pt-6 mt-auto">
								<span className="flex items-center gap-2 text-xs text-muted">
									<span
										className="w-2 h-2 rounded-full"
										style={{ background: LANGUAGE_COLORS[repo.language] || "var(--line-strong)" }}
									/>
									{repo.language || "Other"}
								</span>
								<span className="arrow">
									<ArrowIcon />
								</span>
							</div>
						</a>
					))}
				</div>
			) : (
				<p className="px-6 py-10 text-sm text-muted">Couldn&apos;t load repositories right now.</p>
			)}

			{/* Stack strip */}
			<div className="border-t border-line">
				<p className="py-3 text-center border-b label border-line">Designed and built with</p>
				<ul className="grid grid-cols-3 gap-px md:grid-cols-6 bg-line">
					{STACK.map((tool) => (
						<li key={tool.name} className="flex items-center justify-center gap-3 h-14 bg-page">
							<tool.Icon size={16} className="text-ink" aria-hidden="true" />
							<span className="text-sm font-medium text-muted">{tool.name}</span>
						</li>
					))}
				</ul>
			</div>
		</Section>
	);
}
