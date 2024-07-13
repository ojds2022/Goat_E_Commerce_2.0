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
  mutation addUser($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
    addUser(first_name: $first_name, last_name: $last_name, email: $email, password: $password) {
      token
      customer {
        _id
        email
      }
    }
  }
`
export const ADD_PRODUCT = gql`
  mutation addProduct($product_name: String!, $product_description: String!, $product_url: String!, $price: Float!) {
    addProduct(product_name: $product_name, product_description: $product_description, product_url: $product_url, price: $price) {
      token
      product {
        _id
        product_name
        product_description
        product_url
        price
      }
    }
  }
`
export const ADD_TRANSACTION_MAIN = gql`
  mutation addTransactionMain($total: Float!, $customer_id: ID!, $created_date: String!, $price: Float!) {
    addTransactionMain(total: $total, customer_id: $customer_id, created_date: $created_date, price: $price) { 
      total
      customer_id
      created_date
      ordered
    } 
  }
`
export const ADD_TRANSACTION_DETAIL = gql`
  mutation addTransactionDetail($transaction_id: ID!, $product_id: ID!, $ordered: Boolean!) {
    addTransactionDetail(transaction_id: $transaction_id, product_id: $product_id, ordered: $ordered) { 
      transaction_id
      product_id
      ordered
    } 
  }
`