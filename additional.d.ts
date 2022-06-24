
type spotifyControllerOptions = {
  width?: string,
  height?: string,
  uri?: string,
}

type embedController = {
  loadUri: (uri: string) => void
}

interface spotifyAPI {
  createController: (element: HTMLElement|null, options: spotifyControllerOptions, callback: (embedController) => void) => void
}

declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: spotifyAPI) => void
  }
}

export { spotifyAPI }
