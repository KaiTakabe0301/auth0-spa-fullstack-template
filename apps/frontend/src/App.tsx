import "./App.css";

import { useLazyQuery, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import {
  CreateUserIfNotExistsDocument,
  GetUserByAuth0IdDocument,
} from "./graphql/generated/graphql";

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [createUserIfNotExistsMutation, { data: createUserData }] = useMutation(
    CreateUserIfNotExistsDocument
  );

  const [getUserByAuth0Id] = useLazyQuery(GetUserByAuth0IdDocument);

  useEffect(() => {
    const createUser = async () => {
      if (!user) return;
      const auth0Id = user.sub!; // e.g. "auth0|abcd123..."
      const email = user.email || "";
      const name = user.name || "Unknown";
      try {
        await createUserIfNotExistsMutation({
          variables: { auth0Id, email, name },
        });
      } catch (err) {
        console.error(err);
      }
    };
    if (!isAuthenticated) return;

    createUser();
  }, [user, createUserIfNotExistsMutation, isAuthenticated, getUserByAuth0Id]);

  return (
    <div>
      <h1>Auth0 + Apollo + getAccessTokenSilently</h1>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}</p>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </button>
          {createUserData && (
            <p>DBにユーザが作成されました: {createUserData.createUserIfNotExists.email}</p>
          )}
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login / Signup</button>
      )}
    </div>
  );
}

export default App;
