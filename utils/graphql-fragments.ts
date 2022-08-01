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
