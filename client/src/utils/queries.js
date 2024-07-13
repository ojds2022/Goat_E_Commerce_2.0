import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query customer($email: String!) {
    customer(email: $email) {
      _id
      first_name
      lastName
      email
      }
    }
  }
`;
