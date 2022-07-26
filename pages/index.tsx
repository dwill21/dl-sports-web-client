import ArticleCard from 'components/article-card';
import client from 'utils/apollo-client';
import { gql } from '@apollo/client';
import { ARTICLE_PREVIEW_FRAGMENT, NAVBAR_FRAGMENT, SOCIAL_MEDIA_FRAGMENT } from 'utils/graphql-fragments';
import { flatten } from 'utils/flatten';
import { Article, SocialMedia } from 'additional';
import Image from 'next/image';
import { Fragment } from 'react';
import { Typography } from '@material-tailwind/react';
import { NextSeo } from 'next-seo';

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

      <div className="h-full py-16 md:pt-28 md:px-10 flex flex-col md:flex-row gap-16 justify-center items-center">
        <ArticleCard className="w-screen md:w-[490px] h-[490px]" size="lg" article={articles?.[0]} cmsUrl={cmsUrl}/>
        <div className="flex flex-col items-center">
          <Typography as="h2" className="pb-6 text-3xl">Latest News</Typography>
          <div className="w-screen md:w-[490px] grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.slice(1).map((article, index) => (
              <ArticleCard key={article.title ?? index} className="w-full h-48" size="sm" article={article} cmsUrl={cmsUrl}/>
            ))}
          </div>
        </div>
      </div>

      <div className="w-screen h-[50px] mb-10 bg-grey-200 flex flow-row gap-10 justify-center">
        {socials.map((social) => (
          <Fragment key={social.info}>
            {social.icon?.url &&
              <a href={social.info} className="contents">
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
            }
          </Fragment>
        ))}
      </div>
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
