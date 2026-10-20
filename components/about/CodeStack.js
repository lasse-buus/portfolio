import React from "react";
import Image from "next/image";
import userData from "@constants/data";
import Section from "@components/grid/Section";

// Black logos that need flipping in dark mode
const INVERT_IN_DARK = new Set(["NextJS", "GitHub", "WordPress"]);

const groups = [
	{ label: "Code", items: userData.frontendCode.map((s) => ({ name: s.language, url: s.url })) },
	{ label: "Design tools", items: userData.frontendDesign.map((s) => ({ name: s.design, url: s.url })) },
	{ label: "Productivity", items: userData.frontendOthers.map((s) => ({ name: s.other, url: s.url })) },
];

export default function CodeStack({ index, total }) {
	return (
		<Section index={index} total={total} label="Stack">
			{groups.map((group, gi) => (
				<div key={group.label} className={gi > 0 ? "border-t border-line" : ""}>
					<div className="flex items-center justify-between px-4 py-3 border-b sm:px-6 border-line">
						<span className="label text-ink">{group.label}</span>
						<span className="label">{String(group.items.length).padStart(2, "0")}</span>
					</div>
					<ul className="grid grid-cols-2 cell-grid sm:grid-cols-4 lg:grid-cols-6">
						{group.items.map((item) => (
							<li key={item.name} className="flex items-center gap-3 px-4 h-16 sm:px-6">
								<span className="relative flex-none w-7 h-7">
									<Image
										src={item.url}
										alt=""
										fill
										sizes="28px"
										style={{ objectFit: "contain" }}
										className={INVERT_IN_DARK.has(item.name) ? "dark:invert" : ""}
									/>
								</span>
								<span className="text-sm font-medium truncate text-ink">{item.name}</span>
							</li>
						))}
					</ul>
				</div>
			))}
		</Section>
	);
}
