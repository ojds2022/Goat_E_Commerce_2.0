const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Customer {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Product {
    _id: ID
    product_name: String
    product_description: String
    product_url: String
    price: Float
  }

  type TransactionMain {
    _id: ID
    total: Float
    customer_id: ID
    created_date: String
    ordered: Boolean
  }

  type TransactionDetail {
    _id: ID
    transaction_id: ID
    product_id: ID
    ordered: Boolean
  }

  type Auth {
    token: ID!
    customer: Customer
  }

  type Query {
    customers: [Customer]
    customer(email: String!): Customer
    products: [Product]
    product(_id: ID!): Product
    transactionsMain: [TransactionMain]
    transactionMain(_id: ID!): TransactionMain
    transactionsDetail: [TransactionDetail]
    transactionDetail(_id: ID!): TransactionDetail
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProduct(
      product_name: String!
      product_description: String!
      product_url: String!
      price: Float!
    ): Product
    addTransactionMain(
      total: Float!
      customer_id: ID!
      created_date: String!
      ordered: Boolean!
    ): TransactionMain
    addTransactionDetail(
      transaction_id: ID!
      product_id: ID!
      ordered: Boolean!
    ): TransactionDetail
    completeTransaction(customer_id: ID!): String
  }
`;

module.exports = typeDefs;



/* Read this  (from yong)
// Import the gql function from apollo-server-express
const { gql } = require('apollo-server-express');

// Define the GraphQL type definitions
const typeDefs = gql`
  // Define the Customer type
  type Customer {
    _id: ID
    first_name: String
    last_name: String
    email_address: String
    session_id: String
    created_date: String
  }

  // Define the Product type
  type Product {
    _id: ID
    product_name: String
    product_description: String
    product_url: String
    price: Float
  }

  // Define the TransactionMain type
  type TransactionMain {
    _id: ID
    total: Float
    customer_id: ID
    created_date: String
    ordered: Boolean
  }

  // Define the TransactionDetail type
  type TransactionDetail {
    _id: ID
    transaction_id: ID
    product_id: ID
    ordered: Boolean
  }

  // Define the Auth type
  type Auth {
    token: ID!
    customer: Customer
  }

  // Define the Query type with all the queries
  type Query {
    // Get all customers
    // Example usage: query { customers { _id, first_name, last_name, email_address } }
    customers: [Customer]

    // Get a customer by ID
    // Example usage: query { customer(_id: "60d0fe4f5311236168a109ca") { _id, first_name, last_name, email_address } }
    customer(_id: ID!): Customer

    // Get all products
    // Example usage: query { products { _id, product_name, price, product_url } }
    products: [Product]

    // Get a product by ID
    // Example usage: query { product(_id: "60d0fe4f5311236168a109ca") { _id, product_name, price, product_url } }
    product(_id: ID!): Product

    // Get all main transactions
    // Example usage: query { transactionsMain { _id, total, customer_id } }
    transactionsMain: [TransactionMain]

    // Get a main transaction by ID
    // Example usage: query { transactionMain(_id: "60d0fe4f5311236168a109ca") { _id, total, customer_id } }
    transactionMain(_id: ID!): TransactionMain

    // Get all transaction details
    // Example usage: query { transactionsDetail { _id, transaction_id, product_id, ordered } }
    transactionsDetail: [TransactionDetail]

    // Get a transaction detail by ID
    // Example usage: query { transactionDetail(_id: "60d0fe4f5311236168a109ca") { _id, transaction_id, product_id, ordered } }
    transactionDetail(_id: ID!): TransactionDetail
  }

  // Define the Mutation type with all the mutations
  type Mutation {
    // Add a new customer
    // Example usage: mutation { addCustomer(first_name: "John", last_name: "Doe", email_address: "john.doe@example.com", password: "password123") { token, customer { _id, first_name, last_name, email_address } } }
    addCustomer(
      first_name: String!
      last_name: String!
      email_address: String!
      password: String!
    ): Auth

    // Customer login
    // Example usage: mutation { login(email_address: "john.doe@example.com", password: "password123") { token, customer { _id, first_name, last_name, email_address } } }
    login(email_address: String!, password: String!): Auth

    // Add a new product
    // Example usage: mutation { addProduct(product_name: "New Product", product_description: "This is a new product", product_url: "http://example.com/product.jpg", price: 29.99) { _id, product_name, product_description, product_url, price } }
    addProduct(
      product_name: String!
      product_description: String!
      product_url: String!
      price: Float!
    ): Product

    // Add a new main transaction
    // Example usage: mutation { addTransactionMain(total: 100.00, customer_id: "60d0fe4f5311236168a109ca", created_date: "2023-07-07T00:00:00.000Z", ordered: false) { _id, total, customer_id, created_date, ordered } }
    addTransactionMain(
      total: Float!
      customer_id: ID!
      created_date: String!
      ordered: Boolean!
    ): TransactionMain

    // Add a new transaction detail
    // Example usage: mutation { addTransactionDetail(transaction_id: "60d0fe4f5311236168a109ca", product_id: "60d0fe4f5311236168a109cb", ordered: false) { _id, transaction_id, product_id, ordered } }
    addTransactionDetail(
      transaction_id: ID!
      product_id: ID!
      ordered: Boolean!
    ): TransactionDetail

    // Complete a transaction
    // Example usage: mutation { completeTransaction(customer_id: "60d0fe4f5311236168a109ca") }
    completeTransaction(customer_id: ID!): String
  }
`;

// Export the type definitions to be used in the GraphQL server
module.exports = typeDefs;




*/
