import 'styles/globals.css'
import 'styles/transitions.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Layout from "components/layout";
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import Spinner from 'components/spinner';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00B8E6',
    },
    background: {
      default: '#323232',
      paper: '#191919',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h4: 'h1',
          h5: 'h3',
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    }
  }, [router]);

  return (
    <>
      <DefaultSeo {...SEO} />

      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Layout navbarProps={{...pageProps.navbar}}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>

      <CSSTransition in={loading} classNames="loading-spinner" timeout={200} unmountOnExit>
        <Spinner/>
      </CSSTransition>
    </>
  )
}

export default MyApp
