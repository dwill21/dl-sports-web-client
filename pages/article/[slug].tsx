import client from "utils/client/apollo-client";
import { gql } from "@apollo/client";
import { getScripts } from "utils/script-helpers";
import Script from "next/script";
import { NAVBAR_FRAGMENT } from 'utils/graphql';
import { flatten } from 'utils/flatten';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import AuthorCard from 'components/cards/author-card';
import { Article } from 'additional';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import parse from 'html-react-parser';

interface ArticlePageProps {
  article: Partial<Article>
}

export default function ArticlePage({ article }: ArticlePageProps ) {
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
        <Typography variant="h4" align="center" className="!mb-8">
          {article.title}
        </Typography>

        <div className="flex justify-center">
          {article.cover?.url &&
            <Image
              src={article.cover.url}
              alt={article.cover.alternativeText}
              layout="intrinsic"
              width="1200"
              height="630"
              objectFit="contain"
              priority={true}
            />
          }
        </div>

        <div className="py-8 px-2">
          <Typography component="div" sx={{
            '.twitter-tweet': {
              mx: 'auto',
            },
          }}>
            {parse(article.body ?? "")}
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
                    id
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
                    id
                    attributes {
                        title
                        slug
                        description
                        body
                        publishedAt
                        updatedAt
                        cover {
                            data {
                                id
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
                                id
                                attributes {
                                    firstName
                                    lastName
                                    email
                                    avatar {
                                        data {
                                            id
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
                                id
                                attributes {
                                    name
                                }
                            }
                        }
                        column {
                            data {
                                id
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
      navbar: {
        sports: flatten(data.sports)
      },
    },
    revalidate: 300,
  };
}
