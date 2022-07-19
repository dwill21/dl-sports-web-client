import Script from 'next/script';
import { useEffect, useState } from 'react';
import { SpotifyAPI } from 'additional';
import spotifyClient from 'utils/apollo-client-spotify';
import { gql } from '@apollo/client';
import { Button, Typography } from '@material-tailwind/react';
import apolloClient from 'utils/apollo-client';
import { NAVBAR_FRAGMENT } from 'utils/graphql-fragments';
import { flatten } from 'utils/flatten';
import { NextSeo } from 'next-seo';

type Episode = {
  id: string
  name: string
  html_description: string
}
type PodcastPageProps = {
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
    <Typography as="div" className="mt-4 p-1 md:h-[324px] md:overflow-y-scroll leading-6">
      <Typography as="h2" className="font-bold">{episode.name}</Typography>
      <div dangerouslySetInnerHTML={{ __html: episode.html_description }}/>
    </Typography>
  );
}

export default function PodcastPage({ episodes }: PodcastPageProps) {
  const [selectedEpisode, setSelectedEpisode] = useState(episodes?.[0]);
  const [embedController, setEmbedController] = useState<{ loadUri: (uri: string) => void } | null>(null);

  useEffect(() => {
    window.onSpotifyIframeApiReady = (iFrameAPI: SpotifyAPI) => {
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
      <NextSeo
        title="On the DL"
        description="Listen to the 'On the DL' podcast"
      />
      <Script src="https://open.spotify.com/embed-podcast/iframe-api/v1" async/>

      <div className="my-20 w-screen">
        <Typography as="h1" variant="lead" className="mt-4 mb-10 text-3xl text-center">
          &quot;On the DL&quot; Podcast
        </Typography>
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 justify-center">
          <div className="w-full lg:w-[450px] max-w-screen">
            <div id="embed-iframe"></div>
            <EpisodeText episode={selectedEpisode} />
          </div>

          <div className="w-full lg:w-[450px] max-w-screen h-[500px] bg-grey-200">
            <div className="p-4 flex flex-col gap-6" id="other-episodes">
              <Typography as="h3" variant="lead" className="text-center text-xl">Other Episodes</Typography>
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
  const spotifyData = await spotifyClient.query({
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

  const navbarData = await apolloClient.query({
    query: gql`
        ${NAVBAR_FRAGMENT}
        query Navbar {
            ...Navbar
        }
    `
  });

  return {
    props: {
      episodes: spotifyData.data.show.items,
      navbar: {
        sports: flatten(navbarData.data.sports)
      },
    }
  }
}
