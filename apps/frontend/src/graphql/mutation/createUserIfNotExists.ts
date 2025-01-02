import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION_IF_NOT_EXISTS = gql`
  mutation CreateUserIfNotExists(
    $auth0Id: String!
    $email: String!
    $name: String!
  ) {
    createUserIfNotExists(auth0Id: $auth0Id, email: $email, name: $name) {
      id
      auth0Id
      email
      name
    }
  }
`;
