import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import PageHeader from "@components/grid/PageHeader";
import AboutMeHeader from "@components/about/AboutMeHeader";
import CodeStack from "@components/about/CodeStack";
import { AboutWork, AboutEducation } from "@components/about/AboutExperience";

const TOTAL = 4;

export default function About() {
	return (
		<ContainerBlock bleed title="Lasse Buus - About me">
			<PageHeader label="About" title="Design and code, with a focus on the details" />
			<AboutMeHeader index={1} total={TOTAL} />
			<CodeStack index={2} total={TOTAL} />
			<AboutWork index={3} total={TOTAL} />
			<AboutEducation index={4} total={TOTAL} />
		</ContainerBlock>
	);
}
