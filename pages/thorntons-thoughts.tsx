import client from '../utils/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from '../utils/graphql-utils';
import { flatten } from '../utils/flatten';
import { Card, CardBody, Typography } from '@material-tailwind/react';

export default function ThorntonsThoughtsPage() {
  return (
    <>
      <div className="my-20 md:px-8 w-screen">
        <Typography as="h1" variant="lead" className="mt-4 mb-10 text-3xl text-center">
          Thornton&apos;s Thoughts
        </Typography>

        <div className="lg:w-full flex flex-wrap flex-col lg:flex-row justify-center gap-4">
          {['Lifestyle', 'Sports', 'Music'].map(columnName => (
            <Card
              key={columnName}
              className="w-full h-[500px] lg:basis-[30%] rounded-none"
            >
              <CardBody className="max-w-full max-h-full text-black">
                <Typography as="h3" variant="lead" className="text-center">
                  {columnName}
                </Typography>
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
        query NavbarQuery {
            ...Navbar
        }
    `
  })

  return {
    props: {
      navbar: {
        sports: flatten(data.sports)
      }
    }
  };
}
