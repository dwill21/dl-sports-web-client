import { gql } from '@apollo/client';

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
            description
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
