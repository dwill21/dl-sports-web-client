import ArticleCard from 'components/article-card';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { gql } from '@apollo/client';
import client from 'utils/apollo-client';
import { flatten } from 'utils/flatten';
import { Sport } from 'additional';
import { ARTICLE_PREVIEW_FRAGMENT, NAVBAR_FRAGMENT } from 'utils/graphql-fragments';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

interface SportPageProps {
  sport: Partial<Sport>
  cmsUrl: string
}

export default function SportPage({ sport, cmsUrl }: SportPageProps) {
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={sport.name}
        description={`${sport.name} news, highlights, & analysis`}
      />

      <div className="my-16 md:px-20">
        <Typography as="h1" variant="lead" className="mt-4 mb-6 text-3xl text-center md:text-left">
          {sport.name}
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sport.articles?.[0] && <ArticleCard className="w-full h-64" article={sport.articles[0]} cmsUrl={cmsUrl}/>}

          <div className="w-full md:h-64 md:col-span-2">
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-8 lg:overflow-scroll">
              {sport.articles?.slice(1).map(article => (
                <Card
                  key={article.title}
                  color="grey"
                  className="cursor-pointer rounded-none"
                  onClick={() => router.push(`/article/${article.slug}`)}
                >
                  <CardBody className="max-w-full max-h-full">
                    <Typography as="h5" variant="small" className="mb-2 font-bold">
                      {article.title}
                    </Typography>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {sport.topics?.map(topic => (
            <Card key={topic.title} className="w-full h-64 px-8 py-2 overflow-y-scroll topic-card rounded-none">
              <Typography as="h3" variant="lead" className="text-center font-bold mb-2">
                {topic.title}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: topic.content ?? "" }}/>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
        query AllSports {
            sports {
                data {
                    attributes {
                        slug
                    }
                }
            }
        }
    `
  })
  const paths = flatten(data.sports).map((sport: Sport) => ({ params: { slug: sport.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { data } = await client.query({
    query: gql`
        ${NAVBAR_FRAGMENT}
        ${ARTICLE_PREVIEW_FRAGMENT}
        query Sport($slug: String!) {
            sport(slug: $slug) {
                data {
                    attributes {
                        name
                        topics {
                            title
                            content
                        }
                        articles(pagination: {page: 1, pageSize: 5}, sort: "publishedAt:desc") {
                            data {
                                ...ArticlePreview
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
  })

  if (data.sport.data == null) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      sport: flatten(data.sport),
      cmsUrl: process.env.STRAPI_URL,
      navbar: {
        sports: flatten(data.sports)
      },
    }
  };
}
