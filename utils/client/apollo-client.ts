import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.CMS_GRAPHQL_URL,
  headers: {
    authorization: `Bearer ${process.env.CMS_TOKEN}`,
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
