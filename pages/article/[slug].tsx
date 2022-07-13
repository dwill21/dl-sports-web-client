import client from "utils/apollo-client";
import { gql } from "@apollo/client";
import { getScripts } from "utils/script-helpers";
import Script from "next/script";
import { expandArticleImageURLs, NAVBAR_FRAGMENT } from '../../utils/graphql-utils';
import { flatten } from '../../utils/flatten';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import AuthorCard from '../../components/author-card';
import { Article } from 'additional';
import { NextSeo } from 'next-seo';

interface ArticlePageProps {
  article: Partial<Article>
}

export default function ArticlePage({ article }: ArticlePageProps ) {
  const externalScripts = article.body ? getScripts(article.body) : [];

  return (
    <>
      <NextSeo
        title={article.title}
        description={article.description}
        openGraph={{
          title: article.title,
          description: article.description,
          type: 'article',
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

      <div className="md:w-3/4 xl:w-2/3 mx-auto py-14 items-center">
        <Typography as="h1" className="mb-8 text-center text-2xl">
          {article.title}
        </Typography>

        <div className="flex justify-center">
          {article.cover?.url &&
            <Image
              src={article.cover.url}
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
            <div dangerouslySetInnerHTML={{ __html: article.body ?? "" }} />
            {externalScripts.map((script) => (
              <Script key={script} src={script} strategy="lazyOnload"/>
            ))}
          </Typography>
        </div>

        {article.author && <AuthorCard author={article.author}/>}
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

  const flattenedArticle = flatten(data.article);
  expandArticleImageURLs(flattenedArticle);

  return {
    props: {
      article: flattenedArticle,
      navbar: {
        sports: flatten(data.sports)
      },
    },
  };
}
