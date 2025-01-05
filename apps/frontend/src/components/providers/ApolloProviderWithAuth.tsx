import { ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";

import { useApolloClientWithAuth } from "../../hooks/useApolloClientWithAuth";

export function ApolloProviderWithAuth({ children }: PropsWithChildren) {
  const client = useApolloClientWithAuth();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}