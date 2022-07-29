import ArticleCard from 'components/article-card';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Paper from '@mui/material/Paper';
import { gql } from '@apollo/client';
import client from 'utils/client/apollo-client';
import { flatten } from 'utils/flatten';
import { Sport } from 'additional';
import { ARTICLE_PREVIEW_FRAGMENT, NAVBAR_FRAGMENT } from 'utils/graphql-fragments';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import parse from 'html-react-parser';

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
        <Typography variant="h4" className="mt-4 mb-6 text-center md:text-left">
          {sport.name}
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sport.articles?.[0] && <ArticleCard className="w-full h-64" article={sport.articles[0]} cmsUrl={cmsUrl}/>}

          <div className="w-full md:h-64 md:col-span-2">
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-8 lg:overflow-scroll">
              {sport.articles?.slice(1).map(article => (
                <Card
                  key={article.title}
                  className="p-4"
                  onClick={() => router.push(`/article/${article.slug}`)}
                >
                  <CardActionArea>
                    <Typography className="mb-2">
                      {article.title}
                    </Typography>
                  </CardActionArea>
                </Card>
              ))}
            </div>
          </div>

          {sport.topics?.map(topic => (
            <Paper key={topic.title} className="w-full h-64 px-8 py-2 overflow-y-scroll topic-card">
              <Typography variant="h6" component="h3" align="center" className="mb-2">
                {topic.title}
              </Typography>
              {parse(topic.content ?? "")}
            </Paper>
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
      cmsUrl: process.env.CMS_BASE_URL,
      navbar: {
        sports: flatten(data.sports)
      },
    }
  };
}
