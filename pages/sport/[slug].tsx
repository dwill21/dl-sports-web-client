import ArticleCard from 'components/article-card';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { gql } from '@apollo/client';
import client from 'utils/client/apollo-client';
import { flatten } from 'utils/flatten';
import { Sport } from 'additional';
import { ARTICLE_PREVIEW_FRAGMENT, NAVBAR_FRAGMENT } from 'utils/graphql-fragments';
import { NextSeo } from 'next-seo';
import parse from 'html-react-parser';

interface SportPageProps {
  sport: Partial<Sport>
  cmsUrl: string
}

export default function SportPage({ sport, cmsUrl }: SportPageProps) {
  return (
    <>
      <NextSeo
        title={sport.name}
        description={`${sport.name} news, highlights, & analysis`}
      />

      <Container maxWidth="lg" className="my-16">
        <Typography variant="h4" mt={4} mb={6} className="text-center md:text-left">
          {sport.name}
        </Typography>

        <Grid container columns={12} spacing={2}>
          <Grid item xs={12} md={5}>
            <ArticleCard article={sport.articles?.[0] ?? null} cmsUrl={cmsUrl} height={615}/>
          </Grid>

          <Grid item xs={12} md={7} container spacing={2}>
            {sport.articles?.slice(1).map(article => (
              <Grid key={article.title} item xs={12} md={6}>
                <ArticleCard article={article} cmsUrl={cmsUrl} height={300} smallText/>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} container spacing={2} justifyContent="center" mt={2}>
            {sport.topics?.map(topic => (
              <Grid key={topic.title} item xs={12} md={6} lg={4}>
                <Paper className="p-2 h-full">
                  <Typography variant="h6" component="h3" align="center" className="mb-2">
                    {topic.title}
                  </Typography>
                  <Typography sx={{
                    'ul': {
                      listStyleType: 'disc',
                    },
                    'ul, ol': {
                      pl: 4,
                      pt: 1,
                    },
                    a: {
                      textDecorationLine: 'underline',
                    }
                  }}>
                    {parse(topic.content ?? "")}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
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
