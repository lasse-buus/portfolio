import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import userData from "@constants/data";

const NAV_ITEMS = [
	{ label: "About", href: "/about" },
	{ label: "Blog", href: "/blog" },
	{ label: "Trips", href: "/trips" },
	{ label: "Contact", href: "/contact" },
];

const SunIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
	</svg>
);

const MoonIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	</svg>
);

export const GithubIcon = ({ size = 16 }) => (
	<svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
		<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
	</svg>
);

const iconButton =
	"inline-flex items-center justify-center w-9 h-9 rounded-full border border-line text-ink hover:border-ink transition";

export default function Navbar() {
	const router = useRouter();
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => setMounted(true), []);
	useEffect(() => setOpen(false), [router.asPath]);

	const isDark = mounted && resolvedTheme === "dark";
	const isActive = (href) => router.pathname === href || router.pathname.startsWith(`${href}/`);

	return (
		<header className="sticky top-0 z-40 rule nav-glass">
			<nav className="flex items-center justify-between h-16 px-4 frame sm:px-6">
				{/* Brand */}
				<Link href="/" className="flex items-center gap-4" aria-label="Lasse Buus — home">
					<span className="text-2xl font-bold leading-none tracking-tight text-ink">Buus</span>
					<span className="hidden h-5 border-l md:block border-line" aria-hidden="true" />
					<span className="hidden leading-none label md:block">{userData.designation}</span>
				</Link>

				{/* Desktop links */}
				<ul className="absolute items-center hidden gap-8 transform -translate-x-1/2 md:flex left-1/2">
					{NAV_ITEMS.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className={`relative text-sm font-medium transition hover:text-ink ${
									isActive(item.href) ? "text-ink" : "text-muted"
								}`}
							>
								{item.label}
								{isActive(item.href) ? (
									<span className="absolute w-1 h-1 transform -translate-x-1/2 rounded-full left-1/2 -bottom-2 bg-brand-ink" />
								) : null}
							</Link>
						</li>
					))}
				</ul>

				{/* Actions */}
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => setTheme(isDark ? "light" : "dark")}
						className={iconButton}
						aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
					>
						{mounted ? isDark ? <SunIcon /> : <MoonIcon /> : <span className="w-4 h-4" />}
					</button>
					<a
						href={`https://github.com/${userData.githubUsername}`}
						target="_blank"
						rel="noopener noreferrer"
						className={`${iconButton} hidden sm:inline-flex`}
						aria-label="GitHub"
					>
						<GithubIcon />
					</a>
					<Link href="/contact" className="hidden ml-1 btn btn-solid h-9 md:inline-flex">
						Let&apos;s talk
					</Link>
					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						className={`${iconButton} md:hidden`}
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label={open ? "Close menu" : "Open menu"}
					>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
							{open ? <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" /> : <path d="M2 5h12M2 11h12" />}
						</svg>
					</button>
				</div>
			</nav>

			{/* Mobile menu */}
			{open ? (
				<div id="mobile-menu" className="border-t md:hidden border-line">
					<ul className="frame">
						{NAV_ITEMS.map((item, i) => (
							<li key={item.href} className="border-b last:border-b-0 border-line">
								<Link
									href={item.href}
									className="flex items-center justify-between px-4 py-4 text-base font-medium sm:px-6"
								>
									<span className={isActive(item.href) ? "text-ink" : "text-muted"}>{item.label}</span>
									<span className="label">0{i + 1}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</header>
	);
}
