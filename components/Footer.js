import React from "react";
import userData from "@constants/data";
import PlayingNowFooter from "./spotify/PlayingNowFooter";
import { GithubIcon } from "./Navbar";

const socials = [
	{
		label: "LinkedIn",
		href: userData.socialLinks.linkedin,
		icon: (
			<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
				<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
			</svg>
		),
	},
	{
		label: "GitHub",
		href: `https://github.com/${userData.githubUsername}`,
		icon: <GithubIcon size={15} />,
	},
	{
		label: "Instagram",
		href: userData.socialLinks.instagram,
		icon: (
			<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
				<rect x="3" y="3" width="18" height="18" rx="5" />
				<circle cx="12" cy="12" r="4" />
				<circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
			</svg>
		),
	},
	{
		label: "X",
		href: userData.socialLinks.twitter,
		icon: (
			<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
			</svg>
		),
	},
];

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="rule">
			<div className="frame cross">
				<div className="grid gap-px md:grid-cols-3 bg-line">
					<div className="flex items-center px-4 py-5 sm:px-6 bg-page">
						<PlayingNowFooter />
					</div>
					<div className="flex items-center px-4 py-5 sm:px-6 bg-page md:justify-center">
						<p className="text-sm text-muted">
							© {year} <span className="font-medium text-ink">Lasse Buus Nielsen</span>
						</p>
					</div>
					<div className="flex items-center gap-2 px-4 py-5 sm:px-6 bg-page md:justify-end">
						{socials.map((s) => (
							<a
								key={s.label}
								href={s.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={s.label}
								className="inline-flex items-center justify-center transition border rounded-full w-9 h-9 border-line text-muted hover:text-ink hover:border-ink"
							>
								{s.icon}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
