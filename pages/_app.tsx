import 'styles/globals.css'
import 'styles/transitions.css';
import Layout from "components/layout";
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-tailwind/react';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import Spinner from 'components/spinner';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

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
      <ThemeProvider>
        <Layout navbarProps={{...pageProps.navbar}}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>

      <CSSTransition in={loading} classNames="page-load" timeout={200} unmountOnExit>
        <Spinner/>
      </CSSTransition>
    </>
  )
}

export default MyApp
