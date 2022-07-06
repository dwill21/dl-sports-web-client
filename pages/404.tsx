import client from 'utils/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from 'utils/graphql-utils';
import { flatten } from 'utils/flatten';

export default function NotFoundPage() {
  return (
    <>

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
