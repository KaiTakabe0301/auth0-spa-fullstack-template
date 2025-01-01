import "./App.css";

import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($auth0Id: String!, $email: String!, $name: String!) {
    createUser(auth0Id: $auth0Id, email: $email, name: $name) {
      id
      auth0Id
      email
      name
    }
  }
`;

const GET_USER_BY_AUTH0_ID = gql`
  query GetUserByAuth0Id($auth0Id: String!) {
    getUserByAuth0Id(auth0Id: $auth0Id) {
      id
      auth0Id
      email
      name
    }
  }
`;

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [createUserMutation, { data: createUserData }] =
    useMutation(CREATE_USER_MUTATION);

  const [getUserByAuth0Id] = useLazyQuery(GET_USER_BY_AUTH0_ID);

  useEffect(() => {
    const createUser = async () => {
      if (!user) return;
      const auth0Id = user.sub; // e.g. "auth0|abcd123..."
      const email = user.email || "";
      const name = user.name || "Unknown";
      try {
        const { data } = await getUserByAuth0Id({
          variables: { auth0Id: user.sub },
        });
        if (data?.getUserByAuth0Id) {
          console.log("data: ", data.getUserByAuth0Id);
          console.log("DBにユーザが存在します");
        } else {
          await createUserMutation({ variables: { auth0Id, email, name } });
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (!isAuthenticated) return;

    createUser();
  }, [user, createUserMutation, isAuthenticated, getUserByAuth0Id]);

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
            <p>DBにユーザが作成されました: {createUserData.createUser.email}</p>
          )}
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login / Signup</button>
      )}
    </div>
  );
}

export default App;
