import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/login/action-types";
import {
  ApolloClient,
  ApolloLink,
  from,
  fromPromise,
  InMemoryCache,
  split,
} from "@apollo/client/core";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import * as omitDeep from "omit-deep";

// eslint-disable-next-line
let client: ApolloClient<any>;

// eslint-disable-next-line
export function createApolloClient(baseUrl: string): ApolloClient<any> {
  if (client) {
    return client;
  }

  const httpLink = createUploadLink({
    uri: `${baseUrl}/graphql/`,
    credentials: "include",
  });

  const batchLink = new BatchHttpLink({
    uri: `${baseUrl}/graphql/`,
    credentials: "include",
  });

  const directionalLink = split((operation) => operation.getContext().batch, batchLink, httpLink);

  const cleanTypeNameLink = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      omitDeep(operation.variables, "__typename");
    }
    return forward(operation).map((data) => {
      return data;
    });
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      const store = useStore();
      for (const err of graphQLErrors) {
        switch (err.message) {
          case "You do not have permission to perform this action":
            return fromPromise(store.dispatch(ActionTypes.REFRESH_LOGIN)).flatMap(() => {
              return forward(operation);
            });
        }
      }
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const link = from([cleanTypeNameLink, errorLink]);
  return (client = new ApolloClient({
    link: link.concat(directionalLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  }));
}
