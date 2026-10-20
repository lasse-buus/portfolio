import React from "react";
import Section, { SectionLink } from "@components/grid/Section";
import MediaCard from "@components/grid/MediaCard";

export default function FavouritePosts({ posts, index, total }) {
	const items = (posts?.postsData || [])
		.slice(0, 3)
		.sort((a, b) => (a.title > b.title ? 1 : -1));

	return (
		<Section
			index={index}
			total={total}
			label="Articles"
			action={<SectionLink href="/blog">View all</SectionLink>}
		>
			{items.length ? (
				<div className="grid cell-grid md:grid-cols-3">
					{items.map((item) => (
						<MediaCard
							key={item.slug.current}
							href={`/blog/${item.slug.current}`}
							src={item.imagefrontpage?.url}
							eyebrow="Article"
							eyebrowRight={item.status}
							title={item.title}
						/>
					))}
				</div>
			) : (
				<p className="px-6 py-10 text-sm text-muted">No articles available.</p>
			)}
		</Section>
	);
}
