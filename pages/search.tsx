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
import { SyncLoader } from 'react-spinners';
import { CSSTransition } from 'react-transition-group';
import SearchBar from '../components/search/search-bar';

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
  const [loading, setLoading] = useState(false);
  const searchQuery = Array.isArray(query.q) ? query.q[0] : query.q;

  const searchHandler = (offset?: number, limit?: number) => {
    if (searchQuery) {
      setLoading(true);
      search('article', searchQuery, offset, limit)
        .then(response => {
          setSearchResults(response as any as SearchResponse<Article>)
          setLoading(false);
        });
    }
  }
  useEffect(searchHandler, [searchQuery]);

  return (
    <>
      <div className="md:px-12">
        <div className="py-12 flex flex-col gap-y-6">
          <SearchBar className="px-4 md:px-12"/>
          <Typography as="h1" variant="lead" className="text-center text-2xl">
            Search results for &quot;{searchQuery}&quot;
          </Typography>
        </div>

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

        <SearchPaginationForm className="my-4" totalHits={searchResults.nbHits} handleSearch={searchHandler}/>
      </div>

      <CSSTransition in={loading} classNames="loading-spinner" timeout={200} unmountOnExit>
        <div className="fixed inset-0 bg-grey-200 opacity-50">
          <SyncLoader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
        </div>
      </CSSTransition>
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
