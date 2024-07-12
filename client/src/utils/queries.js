import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query customer($email: String!) {
    customer(email: $email) {
      _id
      firstName
      lastName
      email
      }
    }
  }
`;
