import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import client from "@lib/sanity";
import Section, { SectionLink } from "@components/grid/Section";
import MediaCard from "@components/grid/MediaCard";

const builder = imageUrlBuilder(client);

const formatDate = (iso) =>
	iso ? new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(new Date(iso)) : "—";

export default function FavouriteTrips({ trips, index, total }) {
	const items = (trips?.tripsData ?? [])
		.slice()
		.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
		.slice(0, 3);

	return (
		<Section
			index={index}
			total={total}
			label="Trips"
			action={<SectionLink href="/trips">View all</SectionLink>}
		>
			<div className="grid cell-grid md:grid-cols-3">
				{items.map((item) => {
					const cover = item?.images?.[0];
					return (
						<MediaCard
							key={item.slug.current}
							href={`/trips/${item.slug.current}`}
							src={cover ? builder.image(cover).width(900).auto("format").url() : null}
							alt={item.title}
							ratio="1/1"
							eyebrow={formatDate(item.releaseDate)}
							title={item.title}
						/>
					);
				})}
			</div>
		</Section>
	);
}
