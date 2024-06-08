import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getCookie } from "cookies-next";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.error(graphQLErrors);
  }

  if (networkError) {
    console.error(networkError);
  }
});

const httpLink = new HttpLink({
  uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
  headers: {
    Authorization: `Bearer ${getCookie("JWT_TOKEN")}`,
  },
});

const mainLink = from([errorLink, httpLink]);

/**
 * Generates a new apollo client
 * @returns a new Apollo client
 */
const GenApolloClient = () => {
  return new ApolloClient({
    link: mainLink,
    cache: new InMemoryCache(),
  });
};

export default GenApolloClient;
