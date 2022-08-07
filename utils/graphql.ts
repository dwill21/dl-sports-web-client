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

export const ARTICLE_PREVIEW_FRAGMENT = gql`
    fragment ArticlePreview on ArticleEntity {
        id
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

export const removeFeaturedArticle = (articles: Pick<Article, "id">[], featuredArticle: Pick<Article, 'id'>) => {
    const featuredArticleIndex = articles.findIndex((article: Partial<Article>) => article.id === featuredArticle.id);
    return featuredArticleIndex === -1 ?
      articles.slice(0, -1) :
      articles.slice(0, featuredArticleIndex).concat(articles.slice(featuredArticleIndex + 1));

}
