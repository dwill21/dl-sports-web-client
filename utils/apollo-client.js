import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.STRAPI_API_URL,
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
