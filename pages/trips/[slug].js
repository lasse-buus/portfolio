import imageUrlBuilder from "@sanity/image-url";
import ContainerBlock from "../../components/ContainerBlock";
import Link from "next/link";
import PageHeader from "@components/grid/PageHeader";
import client from "@lib/sanity";
import Carousel from "@components/grid/Carousel";

const DISPLAY_MODES = {
	inline: "inline",
	stacked: "stacked",
	carousel: "carousel",
};

export const Project = ({ title, images = [], date, slug, zoom }) => {
	const builder = imageUrlBuilder(client);
	const urlFor = (source) => builder.image(source);

	const safeImages = Array.isArray(images) ? images.filter((image) => image && image.asset) : [];

	const slides = safeImages.map((image, index) => ({
		key: image._key || `${slug?.current || "trip"}-${index}`,
		alt: image?.alt?.trim() || `${title || "Trip"} — photo ${index + 1}`,
		src: urlFor(image).auto("format").fit("max").width(2000).quality(80).url(),
		original: urlFor(image).auto("format").fit("max").width(2400).quality(85).url(),
		thumb: urlFor(image).auto("format").fit("crop").width(160).height(160).quality(70).url(),
		width: image?.dimensions?.width || 1600,
		height: image?.dimensions?.height || 1200,
	}));

	const formattedDate = date
		? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date))
		: null;

	return (
		<ContainerBlock bleed title={`${title || "Trip"} - Lasse Buus`}>
			<PageHeader
				label="Trip"
				meta={[formattedDate, slides.length ? `${slides.length} photos` : null].filter(Boolean).join(" · ")}
				title={title}
				dot={false}
				size="md"
			>
				<Link href="/trips" className="inline-flex items-center gap-2 mt-8 label text-ink hover:text-brand-ink">
					<span aria-hidden="true">←</span> All trips
				</Link>
			</PageHeader>

			<section className="rule">
				<div className="frame cross">
					<header className="flex items-center justify-between px-4 border-b h-11 sm:px-6 border-line">
						<span className="label">Gallery</span>
						<span className="label">{zoom ? "Click photo to enlarge" : "Swipe or use ← →"}</span>
					</header>
					{slides.length ? (
						<Carousel images={slides} zoom={Boolean(zoom)} />
					) : (
						<p className="px-6 py-10 text-sm text-muted">No images available for this trip.</p>
					)}
				</div>
			</section>
		</ContainerBlock>
	);
};

export const getServerSideProps = async (pageContext) => {
	const pageSlug = pageContext.query.slug;

	if (!pageSlug) {
		return {
			notFound: true,
		};
	}

	const query = encodeURIComponent(`*[ _type == "gallery" && slug.current == "${pageSlug}" ]{
		...,
		images[]{
			...,
			"dimensions": asset->metadata.dimensions
		}
	}`);
	const url = `https://vn88o3gc.api.sanity.io/v1/data/query/production?query=${query}`;

	const result = await fetch(url).then((res) => res.json());
	const trips = result.result[0];

	if (!trips) {
		return {
			notFound: true,
		};
	} else {
		return {
			props: {
				title: trips.title,
				images: Array.isArray(trips.images) ? trips.images : [],
				date: trips.releaseDate,
				slug: trips.slug,
				display: trips.display || DISPLAY_MODES.inline,
				zoom: Boolean(trips.zoom),
			},
		};
	}
};

export default Project;
