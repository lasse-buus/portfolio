import React from "react";
import userData from "@constants/data";
import Section from "@components/grid/Section";

function Row({ date, place, title, content, badge }) {
	return (
		<li className="grid gap-3 px-4 py-8 border-b sm:px-6 md:grid-cols-12 md:gap-6 last:border-b-0 border-line">
			<div className="md:col-span-4">
				<span className="block label text-ink">{date}</span>
				<span className="block mt-2 text-sm text-muted">{place}</span>
			</div>
			<div className="md:col-span-8">
				<div className="flex flex-wrap items-center gap-3">
					<h3 className="text-lg font-bold tracking-tight text-ink">{title}</h3>
					{badge ? (
						<span className="px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider rounded border border-line text-brand-ink">
							{badge}
						</span>
					) : null}
				</div>
				<p className="mt-2 text-[15px] leading-relaxed text-muted max-w-[68ch]">{content}</p>
			</div>
		</li>
	);
}

export function AboutWork({ index, total }) {
	return (
		<Section index={index} total={total} label="Experience">
			<ol>
				{userData.aboutExperience.map((info) => (
					<Row
						key={`${info.company}-${info.date}`}
						date={info.date}
						place={info.company}
						title={info.title}
						content={info.content}
					/>
				))}
			</ol>
		</Section>
	);
}

export function AboutEducation({ index, total }) {
	return (
		<Section index={index} total={total} label="Education">
			<ol>
				{userData.aboutSchool.map((info) => (
					<Row
						key={`${info.school}-${info.date}`}
						date={info.date}
						place={info.school}
						title={info.title}
						content={info.content}
						badge={info.degree}
					/>
				))}
			</ol>
		</Section>
	);
}

export default function AboutExperience(props) {
	return (
		<>
			<AboutWork {...props} />
		</>
	);
}
