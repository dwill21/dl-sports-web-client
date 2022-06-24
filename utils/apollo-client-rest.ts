import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({
  uri: "https://api.spotify.com/v1/",
  headers: {
    // TODO make this token dynamic
    authorization: `Bearer BQBpW6nsOAceVuqvianvL1dLZ86o2ymEL5D20-DLshdETElXrVyl-U70By_pJdxJhq5zVVAQ8KSrFykyAZC2e12nKg7QzVZrcJ0sXpNpoQKkmSjmIBA`,
  }
});

const restClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
});

export default restClient;
