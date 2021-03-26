import { fetchCsrfToken } from "@/api/csrf-token";
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
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import * as omitDeep from "omit-deep";

// eslint-disable-next-line
let client: ApolloClient<any>;

export function createApolloClient(baseUrl: string) {
  if (client) {
    return client;
  }

  let csrfTokenPromise: Promise<string | undefined>;

  const httpLink = createUploadLink({
    uri: `${baseUrl}/graphql/`,
    credentials: "include",
  });

  const batchLink = new BatchHttpLink({
    uri: `${baseUrl}/graphql/`,
    credentials: "include",
  });

  const directionalLink = split(operation => operation.getContext().batch, batchLink, httpLink);

  const csrfLink = setContext(async (_, { headers }) => {
    if (!csrfTokenPromise) {
      csrfTokenPromise = fetchCsrfToken(baseUrl);
    }
    const csrfToken = await csrfTokenPromise;
    return {
      headers: {
        ...headers,
        ...(csrfToken && { "X-CSRFToken": csrfToken }),
        ...(csrfToken && {
          Cookie: `csrftoken=${csrfToken}`,
        }),
      },
    };
  });

  const cleanTypeNameLink = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      omitDeep(operation.variables, "__typename");
    }
    return forward(operation).map(data => {
      return data;
    });
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      const store = useStore();
      for (const err of graphQLErrors) {
        switch (err.message) {
          case "You do not have permission to perform this action":
            console.log("Attempt refresh with", store.getters["refreshToken"]);
            return fromPromise(store.dispatch(ActionTypes.REFRESH_LOGIN)).flatMap(() => {
              console.log("Refresh complete");
              return forward(operation);
            });
        }
      }
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const link = from([cleanTypeNameLink, csrfLink, errorLink]);
  return (client = new ApolloClient({
    link: link.concat(directionalLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  }));
}
