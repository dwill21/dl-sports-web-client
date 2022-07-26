import { Typography } from '@material-tailwind/react';
import client from 'utils/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from 'utils/graphql-fragments';
import { flatten } from 'utils/flatten';
import { NextSeo } from 'next-seo';
import NewsTipForm from 'forms/news-tip-form';

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

      <Typography as="h1" variant="lead" className="py-12 text-center text-2xl">
        Contact Details
      </Typography>
      <div className="pb-12 md:px-16 lg:px-32 flex flex-col md:flex-row justify-center gap-12">
        <div className="w-screen md:w-1/2 h-[500px]">
          <Typography as="h3" variant="lead" className="text-center pb-10">
            Get in touch with Sam Thornton
          </Typography>

          <div className="pt-4 rich-text" dangerouslySetInnerHTML={{ __html: contact.body }}/>
        </div>

        <div className="w-screen md:w-1/2">
          <Typography as="h3" variant="lead" className="text-center">
            News tips?
          </Typography>
          <Typography variant="paragraph" className="text-center">
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
