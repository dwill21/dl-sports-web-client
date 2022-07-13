const siteName = 'DL Sports';

const defaultSEO = {
  titleTemplate: `%s | ${siteName}`,
  defaultTitle: siteName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.example.com/',
    site_name: siteName,
  },
  additionalMetaTags: [{
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0',
  }],
  additionalLinkTags: [{
    rel: 'icon',
    href: '/favicon.ico',
  }],
}
export default defaultSEO;
