// Import the necessary models and utility functions
const { Customer, Product, TransactionMain, TransactionDetail } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
  // Define the Query resolvers
  Query: {
    // Get all customers
    // Example usage: query { customers { _id, first_name, last_name, email } }
    customers: async () => {
      return Customer.find();
    },
    // Get a customer by ID
    // Example usage: query { customer(email) { _id, first_name, last_name, email } }
    customer: async (parent, { email }) => {
      return Customer.findOne({ email });
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
    transactionMain2: async (parent, {customer_id,ordered}) => {

      const customerTransactions = await TransactionMain.find({customer_id:customer_id, ordered:ordered})
      return customerTransactions;
    },
    // Get all transaction details
    // Example usage: query { transactionsDetail { _id, transaction_id, product_id, ordered } }
    transactionsDetail: async () => {
      return TransactionDetail.find();
    },
    // Get a transaction detail by ID
    // Example usage: query { transactionDetail(_id: "60d0fe4f5311236168a109ca") { _id, transaction_id, product_id, ordered } }
    transactionDetail: async (parent, { transaction_id,ordered }) => {
      const customerTransactionsDetails = await TransactionDetail.find({transaction_id:transaction_id,ordered:ordered});
      return customerTransactionsDetails;
    },








    
    productDataforCart: async (parent, {_id}) => {
      const productDataReturned = await Product.find({_id:_id});
      return productDataReturned;
    }
  },
  // Define the Mutation resolvers
  Mutation: {
    addUser: async (parent, { first_name, last_name, email, password }) => {
      const customer = await Customer.create({ first_name, last_name , email, password });
      const token = signToken(customer);
      return { token, customer };
    },
    login: async (parent, { email, password }) => {
      const customer = await Customer.findOne({ email });

      if (!customer) {
        throw AuthenticationError;
      }

      const correctPw = await customer.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
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
