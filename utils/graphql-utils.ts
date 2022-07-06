import { gql } from '@apollo/client';
import { Article, SocialMedia } from 'additional';

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
                    socials {
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

export const expandSocialMediaImageURLs = (socialMedia: SocialMedia) => {
  if (socialMedia.icon?.url) {
      socialMedia.icon.url = process.env.STRAPI_URL + socialMedia.icon.url;
  }
}
