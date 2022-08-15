interface Author {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: Partial<Media>
  articles: Partial<Article>[]
}
interface Sport {
  id: number
  name: string
  slug: string
  description: string
  powerRankings: string
  topics: Partial<Topic>[]
  highlights: Partial<Highlight>[]
  articles: Partial<Article>[]
  featuredArticle: Partial<Article>
  powerRankingsArticle: Pick<Article, "id" | "slug">
}
interface Article {
  id: number
  title: string
  slug: string
  description: string
  body: string
  publishedAt: string
  updatedAt: string
  cover: Partial<Media>
  author: Partial<Author>
  sport: Partial<Sport>
  column: Partial<Column>
}
interface Column {
  id: number
  title: string
  articles: Partial<Article>[]
}
interface SocialMedia {
  icon: Media
  info: string
}
interface Media {
  url: string
  alternativeText: string
  width: number
  height: number
  formats: {
    [key: string]: {
      url: string
    }
  }
}
interface Topic {
  title: string
  content: string
}
interface Highlight {
  title: string
  content: string
  thumbnailUrl: string
}

interface NavbarProps {
  sports: Partial<Sport>[]
}

type SpotifyControllerOptions = {
  width?: string,
  height?: string,
  uri?: string,
}
interface SpotifyAPI {
  createController: (element: HTMLElement|null, options: SpotifyControllerOptions, callback: (embedController) => void) => void
}
declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: SpotifyAPI) => void
  }
}

export { Article, Author, Column, Sport, Highlight, SocialMedia, NavbarProps, NavbarMenuProps, SpotifyAPI }
