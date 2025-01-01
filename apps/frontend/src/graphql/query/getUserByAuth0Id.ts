import { gql } from "@apollo/client";

export const GET_USER_BY_AUTH0Id_QUERY = gql`
  query GetUserByAuth0Id($auth0Id: String!) {
    getUserByAuth0Id(auth0Id: $auth0Id) {
      id
      auth0Id
      email
      name
    }
  }
`;
