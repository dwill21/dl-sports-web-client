import Script from 'next/script';
import { useEffect, useState } from 'react';
import { SpotifyAPI } from 'additional';
import spotifyClient from 'utils/client/apollo-client-spotify';
import { gql } from '@apollo/client';
import apolloClient from 'utils/client/apollo-client';
import { NAVBAR_FRAGMENT } from 'utils/graphql';
import { flatten } from 'utils/flatten';
import { NextSeo } from 'next-seo';
import parse from 'html-react-parser';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Episode = {
  id: string
  name: string
  html_description: string
}
type PodcastPageProps = {
  episodes: Episode[]
}
const spotifyPlayerOptions = {
  height: '180px',
  width: '650px',
}

const EpisodeText = ({ episode }: { episode: Episode }) => {
  if (!episode) {
    return null;
  }
  return (
    <Typography component="div" mt={4} p={1}>
      <Typography variant="h6" component="h2" fontWeight={700} mb={1}>{episode.name}</Typography>
      {parse(episode.html_description)}
    </Typography>
  );
}

export default function PodcastPage({ episodes }: PodcastPageProps) {
  const [selectedEpisode, setSelectedEpisode] = useState(episodes?.[0]);
  const [embedController, setEmbedController] = useState<{ loadUri: (uri: string) => void } | null>(null);
  const [expanded, setExpanded] = useState(false);

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

      <Container maxWidth="md" sx={{ my: 8 }}>
        <Typography variant="h4" align="center" my={6}>
          &quot;On the DL&quot; Podcast
        </Typography>

        <div id="embed-iframe"></div>

        <Box mt={2} mb={4} mx={{ xs: 4, md: 12 }}>
          <Accordion expanded={expanded} onChange={() => {
            setExpanded(!expanded)
          }}>
            <AccordionSummary
              id="other-episodes-header"
              aria-controls="other-episodes-content"
              expandIcon={<ExpandMoreIcon/>}
            >
              Other Episodes
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {episodes.map((episode, index) => (
                  <ListItem key={episode.id} divider={index !== episodes.length-1}>
                    <ListItemButton id={episode.id} onClick={() => {
                      if (embedController) {
                        setSelectedEpisode(episode);
                        embedController.loadUri(`spotify:episode:${episode.id}`);
                      }
                      setExpanded(false);
                    }}>
                      {episode.name}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Paper sx={{ p: 2 }}>
          <EpisodeText episode={selectedEpisode} />
        </Paper>
      </Container>
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
