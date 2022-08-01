import ArticleCard from 'components/article-card';
import client from 'utils/client/apollo-client';
import { gql } from '@apollo/client';
import { ARTICLE_PREVIEW_FRAGMENT, NAVBAR_FRAGMENT, SOCIAL_MEDIA_FRAGMENT } from 'utils/graphql-fragments';
import { flatten } from 'utils/flatten';
import { Article, SocialMedia } from 'additional';
import Image from 'next/image';
import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import { NextSeo } from 'next-seo';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

interface HomePageProps {
  articles: Partial<Article>[]
  socials: Partial<SocialMedia>[]
  cmsUrl: string
}

export default function HomePage({ articles, socials, cmsUrl }: HomePageProps) {
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
            <ArticleCard article={articles?.[0]} cmsUrl={cmsUrl} height={500}/>
          </Box>

          <Box className="w-full flex flex-col justify-between">
            <Typography variant="h4" component="h2" align="center" className="pb-6 font-normal">
              Latest News
            </Typography>
            <Grid container spacing={2}>
              {articles.slice(1).map(article => (
                <Grid key={article.title} item xs={12} md={6}>
                  <ArticleCard article={article} cmsUrl={cmsUrl} height={200} noDescription/>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem/>}
        spacing={{ xs: 3, md: 5 }}
        mb={2}
        className="flex justify-center"
      >
        {socials.map(social => (
          <Fragment key={social.info}>
            {social.icon?.url && (
              <a href={social.info}>
                <Image
                  key={social.info}
                  src={`${cmsUrl}${social.icon.url}`}
                  alt={social.icon.alternativeText}
                  width={24}
                  height={24}
                  layout="intrinsic"
                  objectFit="contain"
                />
              </a>
            )}
            </Fragment>
        ))}
      </Stack>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
        ${NAVBAR_FRAGMENT}
        ${ARTICLE_PREVIEW_FRAGMENT}
        ${SOCIAL_MEDIA_FRAGMENT}
        query HomePage {
            articles(pagination: {page: 1, pageSize: 5}, sort: "publishedAt:desc", filters: {column: {id: {eq: null}}}) {
                data {
                    ...ArticlePreview
                }
            }
            ...Navbar
            ...SocialMedia
        }
    `
  });

  const flattenedArticles = flatten(data.articles);
  const flattenedSocials = flatten(data.contact).socials.map(
    (e: { icon: never }) => ({ ...e, icon: flatten(e.icon) })
  );

  return {
    props: {
      articles: flattenedArticles,
      socials: flattenedSocials,
      cmsUrl: process.env.CMS_BASE_URL,
      navbar: {
        sports: flatten(data.sports)
      }
    }
  }
}
