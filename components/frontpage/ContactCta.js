import React from "react";
import Link from "next/link";
import userData from "@constants/data";
import Section from "@components/grid/Section";

export default function ContactCta({ index, total }) {
	return (
		<Section index={index} total={total} label="Get in touch">
			<div className="flex flex-col gap-8 px-4 py-14 sm:px-6 md:py-20 md:flex-row md:items-end md:justify-between">
				<h2 className="text-4xl font-bold tracking-tight md:text-[56px] md:leading-[1.02] text-ink">
					Let&apos;s build something
					<br />
					<span className="mark">together.</span>
				</h2>
				<div className="flex flex-wrap gap-3">
					<Link href="/contact" className="btn btn-solid">
						Send a message
					</Link>
					<a href={`mailto:${userData.email}`} className="btn">
						Email
					</a>
					<a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
						LinkedIn ↗
					</a>
				</div>
			</div>
		</Section>
	);
}
