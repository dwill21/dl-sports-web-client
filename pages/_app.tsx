import 'styles/globals.css'
import 'styles/search-bar.css';
import Layout from "components/layout";
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-tailwind/react';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider>
        <Layout navbarProps={{...pageProps.navbar}}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
