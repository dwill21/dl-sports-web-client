import client from 'utils/client/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from 'utils/graphql-fragments';
import { flatten } from 'utils/flatten';
import { useRouter } from 'next/router';
import { search } from 'utils/search';
import { Article } from 'additional';
import { ChangeEvent, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Image from 'next/image';
import SearchBar from 'components/search-bar';
import { NextSeo } from 'next-seo';
import TablePaginationActions from 'components/table-pagination-actions';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface SearchResultsPageProps {
  cmsUrl: string
}
interface SearchResponse<T> {
  hits: T[]
  nbHits: number
}

export default function SearchResultsPage({ cmsUrl }: SearchResultsPageProps) {
  const [searchResults, setSearchResults] = useState<SearchResponse<Article>>({ hits: [], nbHits: 0});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const { query } = useRouter();
  const searchQuery = Array.isArray(query.q) ? query.q[0] : query.q;

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  }
  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const handleSearch = () => {
    if (searchQuery) {
      setLoading(true);
      search('article', searchQuery, page * rowsPerPage, rowsPerPage)
        .then(response => {
          setSearchResults(response as any as SearchResponse<Article>)
          setLoading(false);
        });
    }
  }
  useEffect(handleSearch, [searchQuery, page, rowsPerPage]);

  return (
    <>
      <NextSeo
        title="Search"
        description="Search the DL Sports site to find what you're looking for"
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/search`}
      />
      <SearchBar className="px-4 pt-12 pb-6 mx-auto w-full max-w-[600px]"/>

      {searchQuery && (
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" pb={8}>
            Search results for &quot;{searchQuery}&quot;
          </Typography>

          <TableContainer sx={{ mb: 4 }}>
            <Table aria-label="Search results">
              <TableBody>
                {searchResults.hits.map(article => (
                  <TableRow key={article.title}>
                    <TableCell width={150} sx={{ p: { xs: 0, md: 2 } }}>
                      <Image
                        src={`${cmsUrl}${article.cover.formats?.['thumbnail']?.url ?? article.cover.url}`}
                        alt={article.cover.alternativeText}
                        layout="intrinsic"
                        width={150}
                        height={150}
                        objectFit="cover"
                      />
                    </TableCell>
                    <TableCell sx={{ minWidth: 275, verticalAlign: "top" }}>
                      <Typography variant="h6" mb={0.5} lineHeight={{ xs: 1.2, md: 1.4 }}>{article.title}</Typography>
                      <Typography variant="body2">{article.description}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TablePagination
                count={searchResults.nbHits}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 20, 50]}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                ActionsComponent={TablePaginationActions}
              />
            </Table>
          </TableContainer>
        </Container>
      )}

      <Backdrop open={loading} invisible>
        <CircularProgress variant="indeterminate"/>
      </Backdrop>
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
