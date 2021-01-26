import { fetchCsrfToken } from "@/api/csrf-token";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/login/action-types";
import { ApolloClient, from, fromPromise, HttpLink, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

export function createApolloClient(baseUrl: string) {
  let csrfTokenPromise: Promise<string | undefined>;

  const httpLink = new HttpLink({
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

  const jwtLink = setContext(async (_, { headers }) => {
    const store = useStore();
    const jwtToken = store.getters["jwtToken"];
    return {
      headers: {
        ...headers,
        ...(jwtToken && { Authorization: `JWT ${jwtToken}` }),
      },
    };
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

  const link = from([csrfLink, jwtLink, httpLink]);
  return new ApolloClient({
    link: errorLink.concat(link),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
}
