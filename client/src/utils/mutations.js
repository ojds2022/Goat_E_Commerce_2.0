import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      customer {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($first_name: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(first_name: $first_name, lastName: $lastName, email: $email, password: $password) {
      token
      customer {
        _id
        email
      }
    }
  }
`;