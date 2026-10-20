import React from "react";
import Image from "next/image";
import userData from "@constants/data";
import Section from "@components/grid/Section";

const facts = [
	{ label: "Based in", value: userData.address },
	{ label: "Role", value: userData.role },
	{ label: "Email", value: userData.email, href: `mailto:${userData.email}` },
];

export default function AboutMeHeader({ index, total }) {
	return (
		<Section index={index} total={total} label="Profile">
			<div className="grid cell-grid md:grid-cols-12">
				<div className="p-4 sm:p-6 md:col-span-5">
					<div className="media aspect-w-4 aspect-h-5">
						<Image
							src="/profile-stockholm.jpg"
							alt="Lasse Buus Nielsen"
							fill
							priority
							sizes="(max-width: 768px) 100vw, 480px"
							className="object-cover"
						/>
					</div>
				</div>
				<div className="flex flex-col md:col-span-7">
					<div className="px-4 py-8 sm:px-6 md:px-10 md:py-10">
						<span className="label">Hey, I&apos;m</span>
						<h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-ink">
							Lasse Buus Nielsen<span className="text-brand-ink">.</span>
						</h2>
						<p className="mt-6 text-[15px] leading-relaxed text-muted max-w-[62ch]">
							I am a Digital Concept Developer specializing in UI/UX and web development, with a focus for
							details. I&apos;m currently working as a Frontend Developer for a company called Nettmaker in
							Oslo, Norway where I have been for the past 4 year by starting out as an intern through the
							AIESEC program. I&apos;m passionate about making sure that the solutions, interfaces, graphics
							are user-friendly, aesthetically pleasing, clear, on-brand and usable by the clients of
							Nettmaker. Every solution is different and therefore focusing on the details is an important
							step, for making on-brand and usable solutions.
						</p>
					</div>
					<dl className="mt-auto border-t border-line">
						{facts.map((f) => (
							<div
								key={f.label}
								className="grid grid-cols-3 gap-4 px-4 py-4 border-b sm:px-6 md:px-10 last:border-b-0 border-line"
							>
								<dt className="label self-center">{f.label}</dt>
								<dd className="col-span-2 text-sm font-medium text-ink">
									{f.href ? (
										<a href={f.href} className="link-u text-brand-ink">
											{f.value}
										</a>
									) : (
										f.value
									)}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</Section>
	);
}
