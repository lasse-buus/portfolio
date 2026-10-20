import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import PageHeader from "@components/grid/PageHeader";
import Contact from "../components/Contact";

export default function ContactPage() {
	return (
		<ContainerBlock bleed title="Lasse Buus - Contact">
			<PageHeader label="Contact" title="Let's talk" />
			<Contact />
		</ContainerBlock>
	);
}
