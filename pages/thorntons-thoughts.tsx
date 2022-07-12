import client from 'utils/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from 'utils/graphql-utils';
import { flatten } from 'utils/flatten';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Column } from 'additional';
import Link from 'next/link';

interface ColumnsPageProps {
  columns: Column[]
}

export default function ColumnsPage({ columns }: ColumnsPageProps) {
  return (
    <>
      <div className="my-20 md:px-8 w-screen">
        <Typography as="h1" variant="lead" className="mt-4 mb-10 text-3xl text-center">
          Thornton&apos;s Thoughts
        </Typography>

        <div className="lg:w-full flex flex-wrap flex-col lg:flex-row justify-center gap-4">
          {columns.map(column => (
            <Card
              key={column.id}
              className="w-full h-[500px] lg:basis-[30%] rounded-none"
            >
              <CardBody className="max-w-full max-h-full text-black">
                <Typography as="h3" variant="lead" className="text-center mb-2">
                  {column.title}
                </Typography>

                <ul className="pl-2 list-disc">
                  {column.articles?.map(article => (
                    <li key={article.id}>
                      <Link href={`/article/${article.slug}`} passHref>
                        <Typography as="a" variant="small" color="black" className="hover:text-[#0000FFFF] hover:underline">
                          {article.title}
                        </Typography>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
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
