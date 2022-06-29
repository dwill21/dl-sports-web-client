import { gql } from '@apollo/client';
import { Article, ContactMethod } from 'additional';
import { flatten } from './graphql-utils';

export const NAVBAR_FRAGMENT = gql`
    fragment Navbar on Query {
        sports {
            data {
                attributes {
                    name
                    slug
                }
            }
        }
    }
`

export const ARTICLE_PREVIEW_FRAGMENT = gql`
    fragment ArticlePreview on ArticleEntity {
        attributes {
            title
            slug
            cover {
                data {
                    attributes {
                        url
                        alternativeText
                    }
                }
            }
        }
    }
`

export const SOCIAL_MEDIA_FRAGMENT = gql`
    fragment SocialMedia on Query {
        contact {
            data {
                attributes {
                    contactMethod(filters: { socialMedia: { eq: true } }) {
                        info
                        icon {
                            data {
                                attributes {
                                    url
                                    alternativeText
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const expandArticleImageURLs = (article: Article) => {
  if (article.cover?.url) {
    article.cover.url = process.env.STRAPI_URL + article.cover.url;
  }
  if (article.author?.avatar?.url) {
    article.author.avatar.url = process.env.STRAPI_URL + article.author.avatar.url;
  }
}

export const expandContactImageURLs = (contactMethod: ContactMethod) => {
  if (contactMethod.icon?.url) {
      contactMethod.icon.url = process.env.STRAPI_URL + contactMethod.icon.url;
  }
}
