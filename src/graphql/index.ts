import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      name
      rocket
      timestamp
      twitter
    }
  }
`;

export const INSERT_USER_MUTATION = gql`
  mutation insertUser($name: String!, $rocket: String!, $twitter: String!) {
    insert_users(objects: { name: $name, rocket: $rocket, twitter: $twitter }) {
      returning {
        id
        name
        rocket
        timestamp
        twitter
      }
    }
  }
`;

export interface User {
  id: string;
  name: string;
  rocket: string;
  timestamp: string;
  twitter: string;
}

export interface InsertUserVariables {
  name: string;
  rocket: string;
  twitter: string;
}

export interface UsersQuery {
  users: User[];
}

export interface InsertUserResult {
  returning: User[];
}

export interface InsertUserMutation {
  insert_users: InsertUserResult;
}
