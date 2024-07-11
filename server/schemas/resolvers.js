// Import the necessary models and utility functions
const { Customer, Product, TransactionMain, TransactionDetail } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
  // Define the Query resolvers
  Query: {
    // Get all customers
    // Example usage: query { customers { _id, first_name, last_name, email_address } }
    customers: async () => {
      return Customer.find();
    },
    // Get a customer by ID
    // Example usage: query { customer(_id: "60d0fe4f5311236168a109ca") { _id, first_name, last_name, email_address } }
    customer: async (parent, { _id }) => {
      return Customer.findById(_id);
    },
    // Get all products
    // Example usage: query { products { _id, product_name, price, product_url } }
    products: async () => {
      return Product.find();
    },
    // Get a product by ID
    // Example usage: query { product(_id: "60d0fe4f5311236168a109ca") { _id, product_name, price, product_url } }
    product: async (parent, { _id }) => {
      return Product.findById(_id);
    },
    // Get all main transactions
    // Example usage: query { transactionsMain { _id, total, customer_id } }
    transactionsMain: async () => {
      return TransactionMain.find();
    },
    // Get a main transaction by ID
    // Example usage: query { transactionMain(_id: "60d0fe4f5311236168a109ca") { _id, total, customer_id } }
    transactionMain: async (parent, { _id }) => {
      return TransactionMain.findById(_id);
    },
    // Get all transaction details
    // Example usage: query { transactionsDetail { _id, transaction_id, product_id, ordered } }
    transactionsDetail: async () => {
      return TransactionDetail.find();
    },
    // Get a transaction detail by ID
    // Example usage: query { transactionDetail(_id: "60d0fe4f5311236168a109ca") { _id, transaction_id, product_id, ordered } }
    transactionDetail: async (parent, { _id }) => {
      return TransactionDetail.findById(_id);
    },
  },
  // Define the Mutation resolvers
  Mutation: {
    // Add a new customer
    // Example usage: mutation { addCustomer(first_name: "John", last_name: "Doe", email_address: "john.doe@example.com", password: "password123") { token, customer { _id, first_name, last_name, email_address } } }
    addCustomer: async (parent, args) => {
      const customer = await Customer.create(args);
      const token = signToken(customer);
      return { token, customer };
    },
    // Customer login
    // Example usage: mutation { login(email_address: "john.doe@example.com", password: "password123") { token, customer { _id, first_name, last_name, email_address } } }
    login: async (parent, { email_address, password }) => {
      const customer = await Customer.findOne({ email_address });

      if (!customer) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const validPassword = await bcrypt.compare(password, customer.password);

      if (!validPassword) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(customer);
      return { token, customer };
    },
    // Add a new product
    // Example usage: mutation { addProduct(product_name: "New Product", product_description: "This is a new product", product_url: "http://example.com/product.jpg", price: 29.99) { _id, product_name, product_description, product_url, price } }
    addProduct: async (parent, args) => {
      return Product.create(args);
    },
    // Add a new main transaction
    // Example usage: mutation { addTransactionMain(total: 100.00, customer_id: "60d0fe4f5311236168a109ca") { _id, total, customer_id } }
    addTransactionMain: async (parent, args) => {
      return TransactionMain.create(args);
    },
    // Add a new transaction detail
    // Example usage: mutation { addTransactionDetail(transaction_id: "60d0fe4f5311236168a109ca", product_id: "60d0fe4f5311236168a109cb", ordered: false) { _id, transaction_id, product_id, ordered } }
    addTransactionDetail: async (parent, args) => {
      return TransactionDetail.create(args);
    },
    // Complete a transaction
    // Example usage: mutation { completeTransaction(customer_id: "60d0fe4f5311236168a109ca") }
    completeTransaction: async (parent, { customer_id }) => {
      await TransactionMain.updateMany(
        { customer_id, ordered: false },
        { ordered: true }
      );

      const transactionIds = await TransactionMain.find({ customer_id, ordered: true }).select('_id');

      await TransactionDetail.updateMany(
        { transaction_id: { $in: transactionIds }, ordered: false },
        { ordered: true }
      );

      return 'Transaction completed successfully';
    },
  },
};

// Export the resolvers to be used in the GraphQL server
module.exports = resolvers;
