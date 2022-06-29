import { gql } from '@apollo/client';
import { Article } from 'additional';

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

export const expandImageURLs = (article: Article) => {
  if (article.cover?.url) {
    article.cover.url = process.env.STRAPI_URL + article.cover.url;
  }
  if (article.author?.avatar?.url) {
    article.author.avatar.url = process.env.STRAPI_URL + article.author.avatar.url;
  }
}
