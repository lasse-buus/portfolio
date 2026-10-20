import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Page shell. Pages built on the grid (e.g. the front page) pass `bleed`
 * and render their own <Section>s. Other pages are placed inside a single
 * framed column so they still sit on the grid.
 */
export default function ContainerBlock({ children, bleed = false, ...customMeta }) {
	const router = useRouter();
	const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://lassebuus.no").replace(/\/+$/, "");
	const path = (router.asPath || "/").split("?")[0].split("#")[0];
	const canonicalUrl = `${siteUrl}${path === "/" ? "" : path}`;

	const meta = {
		title: "Lasse Buus - Developer, Designer",
		description: "Lasse Buus Nielsen — frontend developer and UX/UI designer based in Oslo, Norway.",
		image: "/avatar-primary.jpg",
		type: "website",
		...customMeta,
	};
	const socialImage = meta.image.startsWith("http")
		? meta.image
		: `${siteUrl}${meta.image.startsWith("/") ? "" : "/"}${meta.image}`;

	return (
		<div className="flex flex-col min-h-screen bg-page text-ink">
			<Head>
				<title>{meta.title}</title>
				<meta name="robots" content="follow, index" />
				<meta content={meta.description} name="description" />
				<meta property="og:url" content={canonicalUrl} />
				<link rel="canonical" href={canonicalUrl} />
				<link rel="shortcut icon" href="/buus-web-logo.svg" />
				<meta property="og:type" content={meta.type} />
				<meta property="og:site_name" content="Lasse Buus" />
				<meta property="og:description" content={meta.description} />
				<meta property="og:title" content={meta.title} />
				<meta property="og:image" content={socialImage} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@lassebuus" />
				<meta name="twitter:title" content={meta.title} />
				<meta name="twitter:description" content={meta.description} />
				<meta name="twitter:image" content={socialImage} />
				{meta.date && <meta property="article:published_time" content={meta.date} />}
			</Head>
			<Navbar />
			<main className="flex-1">
				{bleed ? (
					children
				) : (
					<div className="h-full rule">
						<div className="h-full px-4 pb-16 frame sm:px-6">{children}</div>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
