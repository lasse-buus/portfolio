import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import ContainerBlock from "../../components/ContainerBlock";
import PageHeader from "@components/grid/PageHeader";
import client from "@lib/sanity";

const builder = imageUrlBuilder(client);

const serializers = {
	marks: {
		internalLink: ({ mark, children }) => {
			const { slug = {} } = mark;
			return <a href={`/${slug.current}`}>{children}</a>;
		},
		link: ({ mark, children }) => {
			const { blank, href } = mark;
			return blank ? (
				<a href={href} target="_blank" rel="noopener noreferrer">
					{children}
				</a>
			) : (
				<a href={href}>{children}</a>
			);
		},
	},
};

export const Post = ({ title, image, poststatus, content, caption }) => {
	return (
		<ContainerBlock bleed title={`${title} - Lasse Buus`}>
			<PageHeader label="Article" meta={poststatus} title={title} dot={false} size="md">
				<Link href="/blog" className="inline-flex items-center gap-2 mt-8 label text-ink hover:text-brand-ink">
					<span aria-hidden="true">←</span> All articles
				</Link>
			</PageHeader>

			{image ? (
				<section className="rule">
					<div className="p-4 frame sm:p-6">
						<figure>
							<div className="media aspect-w-16 aspect-h-9">
								<Image
									src={builder.image(image).width(2000).auto("format").url()}
									alt={caption || title}
									fill
									priority
									sizes="(max-width: 1240px) 100vw, 1200px"
									className="object-cover"
								/>
							</div>
							{caption ? <figcaption className="mt-3 label">↳ {caption}</figcaption> : null}
						</figure>
					</div>
				</section>
			) : null}

			<section className="rule">
				<div className="px-4 py-12 frame sm:px-6 md:py-20">
					<article className="max-w-2xl mx-auto">
						<BlockContent blocks={content} serializers={serializers} className="blog-content" />
					</article>
				</div>
			</section>
		</ContainerBlock>
	);
};

export const getServerSideProps = async (pageContext) => {
	const pageSlug = pageContext.query.slug;

	if (!pageSlug) {
		return { notFound: true };
	}

	const query = encodeURIComponent(`*[ _type == "posts" && slug.current == "${pageSlug}" ]`);
	const url = `https://vn88o3gc.api.sanity.io/v1/data/query/production?query=${query}`;

	const result = await fetch(url).then((res) => res.json());
	const post = result?.result?.[0];

	if (!post) {
		return { notFound: true };
	}

	return {
		props: {
			poststatus: post.status || null,
			title: post.title,
			image: post.image || null,
			content: post.blockText || [],
			caption: post.imagecaption || null,
		},
	};
};

export default Post;
