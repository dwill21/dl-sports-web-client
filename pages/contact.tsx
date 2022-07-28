import Typography from '@mui/material/Typography';
import client from 'utils/client/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from 'utils/graphql-fragments';
import { flatten } from 'utils/flatten';
import { NextSeo } from 'next-seo';
import NewsTipForm from 'forms/news-tip-form';
import parse from 'html-react-parser';

interface ContactPageProps {
  contact: {
    body: string
  }
}

export default function ContactPage({ contact }: ContactPageProps) {
  return (
    <>
      <NextSeo
        title="Contact"
        description="Reach out to Sam Thornton or send in a news tip"
      />

      <Typography variant="h2" component="h1" align="center" className="py-12">
        Contact Details
      </Typography>
      <div className="pb-12 md:px-16 lg:px-32 flex flex-col md:flex-row justify-center gap-12">
        <div className="w-screen md:w-1/2 h-[500px]">
          <Typography variant="h5" component="h3" align="center" className="pb-10">
            Get in touch with Sam Thornton
          </Typography>

          <Typography component="div" className="pt-4 rich-text">
            {parse(contact.body)}
          </Typography>
        </div>

        <div className="w-screen md:w-1/2">
          <Typography variant="h5" component="h3" align="center">
            News tips?
          </Typography>
          <Typography variant="subtitle1" align="center">
            Fill one out below!
          </Typography>

          <NewsTipForm/>
        </div>
      </div>
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
