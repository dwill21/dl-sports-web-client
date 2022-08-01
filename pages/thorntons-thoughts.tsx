import client from 'utils/client/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from 'utils/graphql-fragments';
import { flatten } from 'utils/flatten';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Column } from 'additional';
import { NextSeo } from 'next-seo';
import TypographyLink from 'components/typography-link';

interface ColumnsPageProps {
  columns: Column[]
}

export default function ColumnsPage({ columns }: ColumnsPageProps) {
  return (
    <>
      <NextSeo
        title="Thornton's Thoughts"
        description="Hear a fan's perspective on his personal favorite teams and other topics"
      />

      <div className="my-12 md:px-8 w-screen">
        <Typography variant="h4" align="center" className="mt-4 mb-16">
          Thornton&apos;s Thoughts
        </Typography>

        <div className="lg:w-full flex flex-wrap flex-col lg:flex-row justify-center gap-4">
          {columns.map(column => (
            <Paper
              key={column.id}
              className="w-full h-[500px] lg:basis-[30%]"
            >
              <Typography variant="h6" component="h3" align="center" className="mb-2">
                {column.title}
              </Typography>

              <ul className="pl-6 pr-2 list-disc">
                {column.articles?.map(article => (
                  <li key={article.id} className="my-1">
                    <TypographyLink href={`/article/${article.slug}`} color="black" className="hover:text-[#0000FFFF] hover:underline">
                      {article.title ?? ""}
                    </TypographyLink>
                  </li>
                ))}
              </ul>
            </Paper>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
        ${NAVBAR_FRAGMENT}
        query ColumnsQuery {
            columns {
                data {
                    id
                    attributes {
                        title
                        articles {
                            data {
                                id
                                attributes {
                                    title
                                    slug
                                }
                            }
                        }
                    }
                }
            }
            ...Navbar
        }
    `
  })

  const flattenedColumns = flatten(data.columns);
  flattenedColumns.forEach((column: Column) => {
    column.articles = flatten(column.articles);
  });

  return {
    props: {
      columns: flattenedColumns,
      navbar: {
        sports: flatten(data.sports)
      }
    }
  };
}
