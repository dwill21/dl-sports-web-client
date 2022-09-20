import client from 'utils/client/apollo-client';
import { gql } from '@apollo/client';
import { ARTICLE_PREVIEW_FRAGMENT, NAVBAR_FRAGMENT } from 'utils/graphql';
import { flatten } from 'utils/flatten';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Column } from 'additional';
import { NextSeo } from 'next-seo';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ArticleCard from 'components/cards/article-card';
import Stack from '@mui/material/Stack';

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

      <Container maxWidth="lg" className="my-12">
        <Typography variant="h4" align="center" mt={4} mb={8}>
          Thornton&apos;s Thoughts
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {columns.map(column => (
            <Grid key={column.id} item xs={12} md={6} lg={4}>
              <Typography variant="h5" align="center">
                {column.title}
              </Typography>

              <Divider flexItem sx={{ mt: 0.5, mb: 1.5 }}/>

              <Stack spacing={2}>
                {column.articles?.map(article => (
                  <ArticleCard key={article.id} article={article} imageHeight={175} imageWidth={200} smallText/>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
        ${NAVBAR_FRAGMENT}
        ${ARTICLE_PREVIEW_FRAGMENT}
        query ColumnsQuery {
            columns {
                data {
                    id
                    attributes {
                        title
                        articles {
                            data {
                                ...ArticlePreview
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
