// src/apolloClient.ts
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const useApolloClientWithAuth = () => {
  const { getAccessTokenSilently } = useAuth0();

  // 再生成を抑制するため useMemo を使う
  const client = React.useMemo(() => {
    const httpLink = new HttpLink({
      uri: import.meta.env.VITE_BACKEND_URL as string,
    });

    // setContextの中で、必要に応じてアクセストークンを取得
    const authLink = setContext(async (_, { headers }) => {
      try {
        const token = await getAccessTokenSilently();
        return {
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      } catch (err) {
        // 未ログインやエラーがあればトークンなし
        return { headers };
      }
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [getAccessTokenSilently]);

  return client;
};
