import imageUrlBuilder from "@sanity/image-url";
import ContainerBlock from "../components/ContainerBlock";
import PageHeader from "@components/grid/PageHeader";
import Section from "@components/grid/Section";
import MediaCard from "@components/grid/MediaCard";

const builder = imageUrlBuilder({ projectId: "vn88o3gc", dataset: "production" });

export default function Projects({ projects }) {
	const items = [...projects].sort((a, b) => (a.title > b.title ? 1 : -1));

	return (
		<ContainerBlock bleed title="Lasse Buus - Projects">
			<PageHeader label="Projects" title="Selected work" meta={`${items.length} ${items.length === 1 ? "project" : "projects"}`} />
			<Section label="All projects">
				{items.length ? (
					<div className="grid cell-grid sm:grid-cols-2 lg:grid-cols-3">
						{items.map((post, i) => {
							const source = post.image;
							return (
								<MediaCard
									key={post.slug.current}
									href={`/projects/${post.slug.current}`}
									src={source ? builder.image(source).width(900).auto("format").url() : null}
									eyebrow="Project"
									eyebrowRight={post.status}
									title={post.title}
									priority={i < 3}
								/>
							);
						})}
					</div>
				) : (
					<p className="px-6 py-10 text-sm text-muted">No projects yet.</p>
				)}
			</Section>
		</ContainerBlock>
	);
}

export const getServerSideProps = async () => {
	const query = encodeURIComponent('*[ _type == "projects" ]');
	const url = `https://vn88o3gc.api.sanity.io/v1/data/query/production?query=${query}`;
	const result = await fetch(url).then((res) => res.json());

	return {
		props: {
			projects: result?.result?.length ? result.result : [],
		},
	};
};
