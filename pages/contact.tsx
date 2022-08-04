import Typography from '@mui/material/Typography';
import client from 'utils/client/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from 'utils/graphql-fragments';
import { flatten } from 'utils/flatten';
import { NextSeo } from 'next-seo';
import NewsTipForm from 'forms/news-tip-form';
import parse from 'html-react-parser';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

interface ContactPageProps {
  contact: {
    body: string
  }
}

export default function ContactPage({ contact }: ContactPageProps) {
  const theme = useTheme();

  return (
    <>
      <NextSeo
        title="Contact"
        description="Reach out to Sam Thornton or send in a news tip"
      />

      <Container maxWidth="md">
        <Typography variant="h4" align="center" className="py-12">
          Contact Details
        </Typography>

        <Grid container pb={12} spacing={8}>
          <Grid item xs={12} md={6}>
            <Paper className="p-4 h-full">
              <Typography variant="h5" align="center" pb={6}>
                Get in touch with Sam Thornton
              </Typography>

              <Typography component="div" sx={{
                'a:hover': {
                  color: theme.palette.primary.main,
                  textDecoration: 'underline',
                }
              }}>
                {parse(contact.body)}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className="p-4">
              <Typography variant="h5" align="center">
                News tips?
              </Typography>
              <Typography variant="subtitle1" align="center">
                Fill one out below!
              </Typography>

              <NewsTipForm/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
        ${NAVBAR_FRAGMENT}
        query ContactPage {
            contact {
                data {
                    attributes {
                        body
                    }
                }
            }
            ...Navbar
        }
    `
  })

  return {
    props: {
      contact: flatten(data.contact),
      navbar: {
        sports: flatten(data.sports)
      }
    }
  };
}
