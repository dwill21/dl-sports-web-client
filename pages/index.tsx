import ArticleCard from 'components/cards/article-card';
import client from 'utils/client/apollo-client';
import { gql } from '@apollo/client';
import { ARTICLE_PREVIEW_FRAGMENT, NAVBAR_FRAGMENT, removeFeaturedArticle } from 'utils/graphql';
import { flatten } from 'utils/flatten';
import { Article } from 'additional';
import Typography from '@mui/material/Typography';
import { NextSeo } from 'next-seo';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

interface HomePageProps {
  featuredArticle: Partial<Article>
  articles: Partial<Article>[]
}

export default function HomePage({ featuredArticle, articles }: HomePageProps) {
  return (
    <>
      <NextSeo
        description="News, highlights, and analysis for all your favorite sports"
      />

      <Container maxWidth="lg" className="py-16">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          divider={<Divider orientation="vertical" flexItem/>}
          spacing={2}
        >
          <Box className="w-full">
            <ArticleCard article={featuredArticle} imageHeight={275} imageWidth={300}/>
          </Box>

          <Box className="w-full flex flex-col justify-between">
            <Typography variant="h4" component="h2" align="center" className="pb-6 font-normal">
              Latest News
            </Typography>
            <Grid container spacing={2}>
              {articles.map(article => (
                <Grid key={article.title} item xs={12} md={6}>
                  <ArticleCard article={article} imageHeight={250} imageWidth={300} noDescription smallText/>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
        ${NAVBAR_FRAGMENT}
        ${ARTICLE_PREVIEW_FRAGMENT}
        query HomePage {
            home {
                data {
                    id
                    attributes {
                        featuredArticle {
                            data {
                                ...ArticlePreview
                            }
                        }
                    }
                }
            }
            articles(pagination: {page: 1, pageSize: 5}, sort: "publishedAt:desc", filters: {column: {id: {eq: null}}}) {
                data {
                    ...ArticlePreview
                }
            }
            ...Navbar
        }
    `
  });

  const featuredArticle = flatten(data.home).featuredArticle;
  const articles = removeFeaturedArticle(flatten(data.articles), featuredArticle);

  return {
    props: {
      featuredArticle,
      articles,
      navbar: {
        sports: flatten(data.sports)
      }
    }
  }
}
