import { ReactNode } from 'react';

interface Sport {
  name: string
  slug: string
}
interface NavbarMenuProps {
  sports: Sport[]
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

export { Sport, NavbarProps, NavbarMenuProps, SpotifyAPI }
