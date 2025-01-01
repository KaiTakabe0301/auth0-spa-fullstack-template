import "./index.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;
const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI as string;
const uri = import.meta.env.VITE_GRAPHQL_URI as string;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: redirectUri,
        }}
      >
        <App />
      </Auth0Provider>
    </ApolloProvider>
  </StrictMode>
);
