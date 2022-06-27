import { ReactNode } from 'react';

interface SportMetadata {
  name: string
  slug: string
}
interface NavbarProps {
  sports: SportMetadata[]
}
interface NavbarMenuProps {
  sports: SportMetadata[]
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

export { SportMetadata, NavbarProps, NavbarMenuProps, SpotifyAPI }
