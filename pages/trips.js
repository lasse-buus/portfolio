import imageUrlBuilder from "@sanity/image-url";
import ContainerBlock from "../components/ContainerBlock";
import PageHeader from "@components/grid/PageHeader";
import Section from "@components/grid/Section";
import MediaCard from "@components/grid/MediaCard";
import client from "@lib/sanity";

const builder = imageUrlBuilder(client);

const formatDate = (iso) =>
	iso ? new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(new Date(iso)) : "";

export default function Trips({ trips }) {
	const items = [...trips].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

	return (
		<ContainerBlock bleed title="Lasse Buus - Trips">
			<PageHeader label="Trips" title="Places I've been" meta={`${items.length} ${items.length === 1 ? "trip" : "trips"}`} />
			<Section label="All trips">
				{items.length ? (
					<div className="grid cell-grid sm:grid-cols-2 lg:grid-cols-3">
						{items.map((trip, i) => {
							const cover = trip?.images?.[0];
							return (
								<MediaCard
									key={trip.slug.current}
									href={`/trips/${trip.slug.current}`}
									src={cover ? builder.image(cover).width(900).auto("format").url() : null}
									alt={trip.title}
									ratio="1/1"
									eyebrow={formatDate(trip.releaseDate)}
									eyebrowRight={trip.images?.length ? `${trip.images.length} photos` : null}
									title={trip.title}
									priority={i < 3}
								/>
							);
						})}
					</div>
				) : (
					<p className="px-6 py-10 text-sm text-muted">No trips yet.</p>
				)}
			</Section>
		</ContainerBlock>
	);
}

export const getServerSideProps = async () => {
	const query = encodeURIComponent('*[ _type == "gallery" ]');
	const url = `https://vn88o3gc.api.sanity.io/v1/data/query/production?query=${query}`;
	const result = await fetch(url).then((res) => res.json());

	return {
		props: {
			trips: result?.result?.length ? result.result : [],
		},
	};
};
