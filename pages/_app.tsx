import 'styles/globals.css'
import 'styles/nprogress.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Layout from "components/layout";
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import NProgressBar from 'components/nprogress-bar';

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
  return (
    <>
      <DefaultSeo {...SEO} />
      <NProgressBar/>

      <ThemeProvider theme={theme}>
        <CssBaseline/>

        <SnackbarProvider maxSnack={3}>
          <Layout navbarProps={{...pageProps.navbar}}>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
