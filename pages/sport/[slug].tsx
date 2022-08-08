import ArticleCard from 'components/cards/article-card';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { gql } from '@apollo/client';
import client from 'utils/client/apollo-client';
import { flatten } from 'utils/flatten';
import { Sport, Highlight } from 'additional';
import { ARTICLE_PREVIEW_FRAGMENT, NAVBAR_FRAGMENT, removeFeaturedArticle } from 'utils/graphql';
import { NextSeo } from 'next-seo';
import parse from 'html-react-parser';
import TopicCard from 'components/cards/topic-card';
import { useState } from 'react';
import Modal from 'components/modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Link from 'next/link';

interface SportPageProps {
  sport: Partial<Sport>
  cmsUrl: string
}

export default function SportPage({ sport, cmsUrl }: SportPageProps) {
  const [openHighlight, setOpenHighlight] = useState<Partial<Highlight> | undefined>(undefined);

  const powerRankingsButton = (
    <Link href={`/article/${sport.powerRankingsArticle?.slug}`} passHref>
      <Button variant="outlined" component="a" startIcon={<ReadMoreIcon/>}>
        Read more
      </Button>
    </Link>
  )

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

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={5}>
            <ArticleCard article={sport.featuredArticle ?? null} cmsUrl={cmsUrl} height={615}/>
          </Grid>

          <Grid item xs={12} md={7} container spacing={2}>
            {sport.articles?.map(article => (
              <Grid key={article.id} item xs={12} md={6}>
                <ArticleCard article={article} cmsUrl={cmsUrl} height={300} smallText/>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TopicCard title="Highlights" disableListIndent>
              <List>
                {sport.highlights?.map(highlight => (
                  <ListItem key={highlight.title} disableGutters divider>
                    <ListItemButton onClick={() => {
                      setOpenHighlight(highlight);
                    }}>
                      {highlight.title}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </TopicCard>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
              <TopicCard title="Power Rankings" cardActions={powerRankingsButton}>
                {parse(sport.powerRankings ?? "")}
              </TopicCard>
          </Grid>

          {sport.topics?.map(topic => (
            <Grid key={topic.title} item xs={12} md={6} lg={4}>
              <TopicCard title={topic.title ?? ""}>
                {parse(topic.content ?? "")}
              </TopicCard>
            </Grid>
          ))}
        </Grid>

        <Modal
          open={!!openHighlight}
          title={openHighlight?.title ?? ""}
          onClose={() => {
            setOpenHighlight(undefined)
          }}
          contentSx={{ width: { xs: 300, md: 500, lg: 800 } }}
        >
          {parse(openHighlight?.content ?? "")}
        </Modal>
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
                        powerRankings
                        topics {
                            title
                            content
                        }
                        highlights {
                            data {
                                id
                                attributes {
                                    title
                                    content
                                }
                            }
                        }
                        featuredArticle {
                            data {
                                ...ArticlePreview
                            }
                        }
                        articles(filters: { powerRanking: {eq: false} }, pagination: {page: 1, pageSize: 5}, sort: "publishedAt:desc") {
                            data {
                                ...ArticlePreview
                            }
                        }
                        powerRankingsArticle: articles(filters: { powerRanking: {eq: true} }, pagination: {page: 1, pageSize: 1}, sort: "publishedAt:desc") {
                            data {
                                id
                                attributes {
                                    slug
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
  })

  if (data.sport.data == null) {
    return {
      notFound: true
    }
  }

  const sport = flatten(data.sport);
  sport.powerRankingsArticle = sport.powerRankingsArticle?.[0];  // unwrap the array of one
  sport.articles = removeFeaturedArticle(sport.articles, sport.featuredArticle);

  return {
    props: {
      sport,
      cmsUrl: process.env.CMS_BASE_URL,
      navbar: {
        sports: flatten(data.sports)
      },
    }
  };
}
