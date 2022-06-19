import { gql } from "@apollo/client";
import client from "../apollo-client";
import Head from 'next/head'
import Image from 'next/image'

export default function Home({ article }) {
  return (
    <div className="py-0 px-8">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen	py-16 px-0 flex flex-1 flex-col justify-center items-center">
        <h1 className="m-0 text-6xl text-center">
          Welcome to <a href="https://nextjs.org" className="no-underline hover:underline focus:underline active:underline">Next.js!</a>
        </h1>

        <p className="my-16 mx-0 text-2xl leading-6 text-center">
          Get started by editing{' '}
          <code className="p-3 bg-white rounded text-lg">pages/index.js</code>
        </p>

        <div>
          <p>{ article.id }</p>
          <p>{ article.attributes.title }</p>
          <p>{ article.attributes.body }</p>
        </div>
      </main>

      <footer className="py-8 flex flex-1 border-t-1 border-solid border-white justify-center items-center">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className="h-4 ml-2">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
        query Article {
            article(id: 4) {
                data {
                    id
                    attributes {
                        title
                        body
                    }
                }
            }
        }
    `,
  });

  return {
    props: {
      article: data.article.data,
    },
  };
}
