import client from 'utils/client/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from 'utils/graphql-fragments';
import { flatten } from 'utils/flatten';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import searchParty from 'public/searchparty2.webp'
import Link from 'next/link';
import { NextSeo } from 'next-seo';

export default function NotFoundPage() {
  return (
    <>
      <NextSeo
        title="404"
        description="Page not found"
        noindex={true}
      />

      <div className="w-screen h-screen relative flex justify-center items-center">
        <Image src={searchParty} alt="Lost golf ball" layout="fill" objectFit="cover" className="opacity-90"/>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center">
        <span className="mb-4 flex justify-center items-center text-white">
          <Typography variant="h1" className="pr-4 border-r !text-9xl drop-shadow-xl">404</Typography>
          <Typography variant="h3" className="pl-4 drop-shadow-xl">We&apos;re off searching for this page</Typography>
        </span>

        <Link href="/" passHref>
          <a>
            <Button variant="contained" className="w-full">
              Back to the tee box
            </Button>
          </a>
        </Link>
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
