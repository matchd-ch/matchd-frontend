import { fetchCsrfToken } from "@/api/csrf-token";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/login/action-types";
import { ApolloClient, ApolloLink, from, fromPromise, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

export function createApolloClient(baseUrl: string) {
  let csrfTokenPromise: Promise<string | undefined>;

  const httpLink = createUploadLink({
    uri: `${baseUrl}/graphql/`,
    credentials: "include",
  });

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const omitTypename = (key: string, value: any) => (key === "__typename" ? undefined : value);
      operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
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

  const link = from([cleanTypeNameLink, csrfLink, httpLink]);
  return new ApolloClient({
    link: errorLink.concat(link),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
}
