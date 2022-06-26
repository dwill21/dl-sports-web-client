import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({
  uri: "https://api.spotify.com/v1/",
  headers: {
    // TODO make this token dynamic
    authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
  }
});

const restClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
});

export default restClient;
