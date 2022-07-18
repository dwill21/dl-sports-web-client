import client from 'utils/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from 'utils/graphql-utils';
import { flatten } from 'utils/flatten';
import { useRouter } from 'next/router';
import { search } from 'utils/search';
import { Article } from 'additional';
import { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';

export default function SearchResultsPage() {
  const { query } = useRouter();
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const searchQuery = Array.isArray(query.q) ? query.q[0] : query.q;

  useEffect(() => {
    search('article', searchQuery ?? '')
      .then(response => {
        setSearchResults(response.hits as Article[])
      });
  }, [searchQuery]);

  return (
    <>
      <Typography as="h1" variant="lead" className="py-12 text-center text-2xl">
        Search results for &quot;{searchQuery}&quot;
      </Typography>
      <div className="px-12">
        <Typography as="ul">
          {searchResults.map(article => (
            <li key={article.id}>{article.title}</li>
          ))}
        </Typography>
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
