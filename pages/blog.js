import imageUrlBuilder from "@sanity/image-url";
import ContainerBlock from "../components/ContainerBlock";
import PageHeader from "@components/grid/PageHeader";
import Section from "@components/grid/Section";
import MediaCard from "@components/grid/MediaCard";

const builder = imageUrlBuilder({ projectId: "vn88o3gc", dataset: "production" });

const formatDate = (iso) =>
	iso ? new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(new Date(iso)) : "";

export default function Blog({ posts }) {
	const items = [...posts].sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt));

	return (
		<ContainerBlock bleed title="Lasse Buus - Blog">
			<PageHeader label="Blog" title="Articles" meta={`${items.length} ${items.length === 1 ? "post" : "posts"}`} />
			<Section label="All articles">
				{items.length ? (
					<div className="grid cell-grid sm:grid-cols-2 lg:grid-cols-3">
						{items.map((post, i) => {
							const source = post.imagefrontpage || post.image;
							return (
								<MediaCard
									key={post.slug.current}
									href={`/blog/${post.slug.current}`}
									src={source ? builder.image(source).width(900).auto("format").url() : null}
									eyebrow={formatDate(post._createdAt) || "Article"}
									eyebrowRight={post.status}
									title={post.title}
									priority={i < 3}
								/>
							);
						})}
					</div>
				) : (
					<p className="px-6 py-10 text-sm text-muted">No articles yet.</p>
				)}
			</Section>
		</ContainerBlock>
	);
}

export const getServerSideProps = async () => {
	const query = encodeURIComponent('*[ _type == "posts" ]');
	const url = `https://vn88o3gc.api.sanity.io/v1/data/query/production?query=${query}`;
	const result = await fetch(url).then((res) => res.json());

	return {
		props: {
			posts: result?.result?.length ? result.result : [],
		},
	};
};
