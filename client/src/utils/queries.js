import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query customer($email: String!) {
    customer(email: $email) {
      _id
      first_name
      last_name
      email
    }
  }
`;
export const GET_CUSTOMERS = gql`
  query Customers {
    customers {
      _id
      first_name
      last_name
      email_address
    }
  }
`
export const GET_CUSTOMER_BY_ID = gql`
  query Customer($_id: ID!) {
    customer(_id: $_id) {
      _id
      first_name
      last_name
      email_address
    }
  }
`
export const GET_PRODUCTS = gql`
  query Products {
    products {
      _id
      product_name
      product_description
      product_url
      price
    }
  }
`
export const GET_PRODUCT_BY_ID = gql`
  query Product($_id: ID!) {
    product(_id: $_id) {
      _id
      product_name
      product_description
      product_url
      price
    }
  }
`
export const GET_TRANSACTIONS = gql`
  query Transactions {
    transactions {
      _id
      total
      customer_id
      created_date
      ordered
    }
  }
`
export const GET_TRANSACTIONS_BY_ID = gql`
  query transactionDetail($_id: ID!) {
    transactionDetail(_id: $_id) {
      _id
      transaction_id
      product_id
      ordered
    }
  }
`;

export const GET_TRANSACTIONS_BY_CUSTOMER = gql`
  query transactionMain2($customer_id: ID!) {
    transactionMain2(customer_id: $customer_id) {
      _id
      customer_id
      ordered
      total
    }
  }
`