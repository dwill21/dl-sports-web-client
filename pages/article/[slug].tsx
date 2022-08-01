import client from "utils/client/apollo-client";
import { gql } from "@apollo/client";
import { getScripts } from "utils/script-helpers";
import Script from "next/script";
import { NAVBAR_FRAGMENT } from 'utils/graphql-fragments';
import { flatten } from 'utils/flatten';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import AuthorCard from 'components/author-card';
import { Article } from 'additional';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import parse from 'html-react-parser';

interface ArticlePageProps {
  article: Partial<Article>
  cmsUrl: string
}

export default function ArticlePage({ article, cmsUrl }: ArticlePageProps ) {
  const externalScripts = article.body ? getScripts(article.body) : [];
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/article/${article.slug}`;

  return (
    <>
      <NextSeo
        title={article.title}
        description={article.description}
        openGraph={{
          title: article.title,
          description: article.description,
          type: 'article',
          url: url,
          article: {
            publishedTime: article.publishedAt,
            modifiedTime: article.updatedAt,
            section: article.sport?.name || article.column?.title,
            authors: [],
          },
          images: [{
            url: article.cover?.url ?? "",
            alt: article.cover?.alternativeText,
            width: article.cover?.width,
            height: article.cover?.height,
          }]
        }}
      />
      <ArticleJsonLd
        url={url}
        title={article.title ?? ""}
        images={[
          article.cover?.url ?? ""
        ]}
        datePublished={article.publishedAt ?? ""}
        dateModified={article.updatedAt}
        authorName={`${article.author?.firstName} ${article.author?.lastName}`}
        description={article.description ?? ""}
      />

      <div className="md:w-3/4 xl:w-2/3 mx-auto py-14 items-center">
        <Typography as="h1" className="mb-8 text-center text-2xl">
          {article.title}
        </Typography>

        <div className="flex justify-center">
          {article.cover?.url &&
            <Image
              src={`${cmsUrl}${article.cover.url}`}
              alt={article.cover.alternativeText}
              layout="intrinsic"
              width="1000"
              height="400"
              objectFit="cover"
              priority={true}
            />
          }
        </div>

        <div className="py-8 px-2">
          <Typography as="div">
            {parse(article.body ?? "")}
            {externalScripts.map((script) => (
              <Script key={script} src={script} strategy="lazyOnload"/>
            ))}
          </Typography>
        </div>

        {article.author && <AuthorCard author={article.author} cmsUrl={cmsUrl}/>}
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
        query Articles {
            articles {
                data {
                    attributes {
                        slug
                    }
                }
            }
        }
    `
  })

  const paths = data.articles.data.map((article: { attributes: { slug: string } }) => ({
    params: { slug: article.attributes.slug }
  }))
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { data } = await client.query({
    query: gql`
        ${NAVBAR_FRAGMENT}
        query Article($slug: String!) {
            article(slug: $slug) {
                data {
                    attributes {
                        title
                        slug
                        description
                        body
                        publishedAt
                        updatedAt
                        cover {
                            data {
                                attributes {
                                    url
                                    alternativeText
                                    width
                                    height
                                }
                            }
                        }
                        author {
                            data {
                                attributes {
                                    firstName
                                    lastName
                                    email
                                    avatar {
                                        data {
                                            attributes {
                                                url
                                                alternativeText
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        sport {
                            data {
                                attributes {
                                    name
                                }
                            }
                        }
                        column {
                            data {
                                attributes {
                                    title
                                }
                            }
                        }
                    }
                }
            }
            ...Navbar
        }
    `,
    variables: {
      slug: params.slug
    }
  });

  if (data.article.data == null) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      article: flatten(data.article),
      cmsUrl: process.env.CMS_BASE_URL,
      navbar: {
        sports: flatten(data.sports)
      },
    },
  };
}
