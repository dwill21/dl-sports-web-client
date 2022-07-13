import 'styles/globals.css'
import Layout from "components/layout";
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-tailwind/react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DL Sports</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta charSet="UTF-8"/>
      </Head>
      <ThemeProvider>
        <Layout navbarProps={{...pageProps.navbar}}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
