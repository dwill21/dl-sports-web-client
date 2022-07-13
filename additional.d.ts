import { ReactNode } from 'react';

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
  topics: Partial<Topic>[]
  articles: Partial<Article>[]
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
}
interface Topic {
  title: string
  content: string
}

interface NavbarProps {
  sports: Partial<Sport>[]
}
interface NavbarMenuProps {
  sports: Partial<Sport>[]
  navItems: ReactNode[]
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

export { Article, Author, Column, Sport, SocialMedia, NavbarProps, NavbarMenuProps, SpotifyAPI }
