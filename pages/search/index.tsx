import client from 'utils/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from 'utils/graphql-fragments';
import { flatten } from 'utils/flatten';
import { useRouter } from 'next/router';
import { search } from 'utils/search';
import { Article } from 'additional';
import { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import SearchPaginationForm from 'forms/search-pagination-form';

interface SearchResultsPageProps {
  cmsUrl: string
}
interface SearchResponse<T> {
  hits: T[]
  nbHits: number
}

export default function SearchResultsPage({ cmsUrl }: SearchResultsPageProps) {
  const { query } = useRouter();
  const [searchResults, setSearchResults] = useState<SearchResponse<Article>>({ hits: [], nbHits: 0});
  const searchQuery = Array.isArray(query.q) ? query.q[0] : query.q;

  useEffect(() => {
    if (searchQuery) {
      search('article', searchQuery)
        .then(response => {
          setSearchResults(response as any as SearchResponse<Article>)
        });
    }
  }, [searchQuery]);

  return (
    <>
      <Typography as="h1" variant="lead" className="py-12 text-center text-2xl">
        Search results for &quot;{searchQuery}&quot;
      </Typography>
      <div className="px-12">
        <ul className="border-t">
          {searchResults.hits.map(article => (
            <li key={article.id} className="flex py-2 gap-x-2 border-b">
              <Image
                src={`${cmsUrl}${article.cover.formats?.['thumbnail']?.url ?? article.cover.url}`}
                alt={article.cover.alternativeText}
                layout="intrinsic"
                width={150}
                height={150}
                objectFit="cover"
              />
              <div>
                <Typography variant="lead">{article.title}</Typography>
                <Typography>{article.description}</Typography>
              </div>
            </li>
          ))}
        </ul>

        <SearchPaginationForm className="my-4" totalHits={searchResults.nbHits}/>
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
      cmsUrl: process.env.CMS_BASE_URL,
      navbar: {
        sports: flatten(data.sports)
      }
    }
  };
}
