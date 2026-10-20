import ContainerBlock from "../components/ContainerBlock";
import FavouritePosts from "../components/frontpage/FavouritePosts";
import FavouriteTrips from "../components/frontpage/FavouriteTrips";
import LatestCode from "../components/frontpage/LatestCode";
import Hero from "../components/frontpage/Hero";
import Services from "@components/frontpage/Services";
import ContactCta from "@components/frontpage/ContactCta";
import getLatestRepos from "@lib/getLatestRepos";
import userData from "@constants/data";
import client from "@lib/sanity";

const TOTAL_SECTIONS = 5;

export default function Home({ hero, repositories, posts, trips }) {
	return (
		<ContainerBlock
			bleed
			title="Lasse Buus - Developer, Designer"
			description="Lasse Buus Nielsen — frontend developer and UX/UI designer based in Oslo, Norway."
		>
			<Hero hero={hero} />
			<Services index={1} total={TOTAL_SECTIONS} />
			<FavouritePosts posts={posts} index={2} total={TOTAL_SECTIONS} />
			<LatestCode repositories={repositories} index={3} total={TOTAL_SECTIONS} />
			<FavouriteTrips trips={trips} index={4} total={TOTAL_SECTIONS} />
			<ContactCta index={5} total={TOTAL_SECTIONS} />
		</ContainerBlock>
	);
}

// Only fetch the fields the front page renders — keeps the page data small
const heroQuery = `*[_type == "hero"][0]{
	title,
	subtitle,
	imagecaption,
	"image": { "url": image.asset->url }
}`;

const postsQuery = `*[_type == "posts"]{
	title,
	status,
	slug,
	"imagefrontpage": { "url": imagefrontpage.asset->url }
}`;

const tripsQuery = `*[_type == "gallery"] | order(releaseDate desc)[0...3]{
	title,
	slug,
	releaseDate,
	"images": images[0...1]
}`;

const pickRepo = ({ id, name, html_url, pushed_at, description, language }) => ({
	id,
	name,
	html_url,
	pushed_at,
	description: description ?? null,
	language: language ?? null,
});

export async function getStaticProps() {
	const [heroData, postsData, tripsData, repos] = await Promise.all([
		client.fetch(heroQuery),
		client.fetch(postsQuery),
		client.fetch(tripsQuery),
		getLatestRepos(userData, process.env.GITHUB_AUTH_TOKEN),
	]);

	return {
		props: {
			hero: { heroData },
			posts: { postsData },
			trips: { tripsData },
			repositories: (repos || []).map(pickRepo),
		},
		revalidate: 60,
	};
}
