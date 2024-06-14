import store from "@/logic/context/redux";
import {
  ApolloClient,
  ApolloLink,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

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
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const mainLink = from([errorLink, httpLink]);

/**
 * Generates a new Apollo client
 * @returns a new Apollo client
 */
const GenApolloClient = () => {
  console.warn(`Bearer ${store.getState().jwt}`);
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${store.getState().jwt}`,
      },
    });
    return forward(operation);
  });

  const client = new ApolloClient({
    link: authMiddleware.concat(mainLink),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  });

  return client;
};

export default GenApolloClient;
