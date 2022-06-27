import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { spotifyAPI } from '../additional';
import spotifyClient from '../utils/apollo-client-spotify';
import { gql } from '@apollo/client';
import { Button } from '@material-tailwind/react';

type Episode = {
  id: string
  name: string
  html_description: string
}
type PodcastProps = {
  episodes: Episode[]
}
const spotifyPlayerOptions = {
  height: '160px',
  width: '450px',
}

const EpisodeText = ({ episode }: { episode: Episode }) => {
  if (!episode) {
    return null;
  }
  return (
    <div
      dangerouslySetInnerHTML={{ __html: `<b>${episode.name}</b>`.concat(episode.html_description) }}
      className="mt-4 p-1 md:h-[324px] md:overflow-y-scroll"
    />
  );
}

export default function Podcast({ episodes }: PodcastProps) {
  const [selectedEpisode, setSelectedEpisode] = useState(episodes?.[0]);
  const [embedController, setEmbedController] = useState<{ loadUri: (uri: string) => void } | null>(null);

  useEffect(() => {
    window.onSpotifyIframeApiReady = (iFrameAPI: spotifyAPI) => {
      const element = document.getElementById('embed-iframe');
      const options = {
        ...spotifyPlayerOptions,
        uri: `spotify:episode:${episodes?.[0].id}`
      };
      iFrameAPI.createController(element, options, setEmbedController);
    };
  })

  return (
    <>
      <Head>
        <title>DL Sports</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script src="https://open.spotify.com/embed-podcast/iframe-api/v1" async/>

      <div className="my-20 w-screen">
        <h1 className="mt-4 mb-10 text-3xl text-center">&quot;On the DL&quot; Podcast</h1>
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 justify-center">
          <div className="w-full lg:w-[450px] max-w-screen">
            <div id="embed-iframe"></div>
            <EpisodeText episode={selectedEpisode} />
          </div>

          <div className="w-full lg:w-[450px] max-w-screen h-[500px] bg-grey-200">
            <div className="p-4 flex flex-col gap-6" id="other-episodes">
              <h3 className="text-center text-xl">Other Episodes</h3>
              {episodes.map((episode) => (
                <Button
                  key={episode.id}
                  className="w-full h-16 px-2"
                  id={episode.id}
                  onClick={() => {
                    if (embedController) {
                      setSelectedEpisode(episode);
                      embedController.loadUri(`spotify:episode:${episode.id}`);
                    }
                  }}
                >
                  {episode.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const showId = process.env.SPOTIFY_SHOW_ID;
  const { data } = await spotifyClient.query({
    query: gql`
        query podcastEpisodes {
            show @rest(type: "Show", path: "shows/${showId}/episodes?offset=0&limit=5&market=US") {
                items {
                    id
                    name
                    html_description
                }
            }
        }
    `
  });
  return {
    props: {
      episodes: data.show.items
    }
  }
}
