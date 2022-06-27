import 'styles/globals.css'
import Layout from "components/layout";
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-tailwind/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout navbarProps={{ sports: pageProps.sports }}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
