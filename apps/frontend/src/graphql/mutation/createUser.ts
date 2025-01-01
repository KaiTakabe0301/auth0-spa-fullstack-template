import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($auth0Id: String!, $email: String!, $name: String!) {
    createUser(auth0Id: $auth0Id, email: $email, name: $name) {
      id
      auth0Id
      email
      name
    }
  }
`;
