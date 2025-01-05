import "./index.css";
import "./App.css";

import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import ErrorPage from "./components/page/error/ErrorPage";
import { LoginPage } from "./components/page/login";
import { ApolloProviderWithAuth } from "./components/providers";

const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;
const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI as string;

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <ApolloProviderWithAuth>
        <RouterProvider router={router} />
      </ApolloProviderWithAuth>
    </Auth0Provider>
  </StrictMode>
);
