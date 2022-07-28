import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { AccessToken, ClientCredentials } from 'simple-oauth2';
import { setContext } from '@apollo/client/link/context';

const client = new ClientCredentials({
  client: {
    id: process.env.SPOTIFY_CLIENT_ID || "",
    secret: process.env.SPOTIFY_CLIENT_SECRET || ""
  },
  auth: {
    tokenHost: "https://accounts.spotify.com",
    tokenPath: "/api/token",
  }
});
const EXPIRATION_WINDOW = 300; // Window of time (in seconds) before the actual expiration to refresh the token
let spotifyToken: AccessToken;

const withToken = setContext(async () => {
  if (!spotifyToken || spotifyToken.expired(EXPIRATION_WINDOW)) {
    spotifyToken = await client.getToken({});
  }
  return {
    headers: {
      Authorization: `Bearer ${spotifyToken.token.access_token}`,
      Accept: "application/json",
    }
  };
})

const restLink = new RestLink({
  uri: "https://api.spotify.com/v1/"
});

const spotifyClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: withToken.concat(restLink),
});
export default spotifyClient;
