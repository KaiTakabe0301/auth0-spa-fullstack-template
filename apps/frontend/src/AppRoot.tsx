import { ApolloProvider } from "@apollo/client";

import App from "./App";
import { useApolloClientWithAuth } from "./hooks/useApolloClientWithAuth";

export function AppRoot() {
  const client = useApolloClientWithAuth();

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
