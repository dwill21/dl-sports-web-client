import { gql } from '@apollo/client';
import { Article, Highlight } from 'additional';

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

export const addHighlightThumbnail = (highlight: Partial<Highlight>) => {
    const regex = /https:\/\/www\.youtube\.com\/embed\/(\w+)/;
    const match = highlight.content?.match(regex);
    const thumbnailUrl = match?.[1] ? `https://img.youtube.com/vi/${match[1]}/default.jpg` : '';
    return { ...highlight, thumbnailUrl };
}
