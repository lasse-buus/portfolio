import React from "react";
import Image from "next/image";
import Section from "@components/grid/Section";

const services = [
	{
		icon: "/services/crown.svg",
		title: "UI/UX Design",
		text: "Turn what you have in mind of a digital product into reality. For any platform you consider.",
	},
	{
		icon: "/services/app.svg",
		title: "Application Development",
		text: "Standard designing, building, and implementing your applications with documentation.",
	},
	{
		icon: "/services/globe.svg",
		title: "Web Development",
		text: "Create and maintain your websites and also take care of its performance and traffic capacity.",
	},
];

export default function Services({ index, total }) {
	return (
		<Section index={index} total={total} label="What I do">
			<div className="grid gap-px md:grid-cols-3 bg-line">
				{services.map((s, i) => (
					<div key={s.title} className="flex flex-col p-6 bg-page md:p-8 md:min-h-[240px]">
						<div className="flex items-start justify-between">
							<span className="flex items-center justify-center w-10 h-10 rounded-md bg-brand">
								<Image src={s.icon} width={18} height={18} alt="" />
							</span>
							<span className="label">0{i + 1}</span>
						</div>
						<h3 className="mt-auto pt-10 text-xl font-bold tracking-tight text-ink">{s.title}</h3>
						<p className="mt-2 text-sm leading-relaxed text-muted max-w-[34ch]">{s.text}</p>
					</div>
				))}
			</div>
		</Section>
	);
}
