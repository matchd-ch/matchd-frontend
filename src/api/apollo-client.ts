import { fetchCsrfToken } from "@/api/csrf-token";
import { useStore } from "@/store";
import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

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

  return new ApolloClient({
    link: from([csrfLink, jwtLink, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
}
