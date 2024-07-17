const { Customer, Product, TransactionMain, TransactionDetail } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    customers: async () => {
      return Customer.find();
    },
    customer: async (parent, { email }) => {
      return Customer.findOne({ email });
    },
    products: async () => {
      return await Product.find();
    },
    product: async (parent, { id }) => {
      return await Product.findById(id);
    },
    transactionsMain: async () => {
      return TransactionMain.find();
    },
    transactionMain: async (parent, { _id }) => {
      return TransactionMain.findById(_id);
    },
    transactionMain2: async (parent, { customer_id }) => {
      return TransactionMain.find({ customer_id });
    },
    transactionsDetail: async () => {
      return TransactionDetail.find();
    },
    transactionDetail: async (parent, { _id }) => {
      return TransactionDetail.findById(_id);
    },
    getTransactionDetails: async (parent, { transaction_id }) => {
      return TransactionDetail.find({ transaction_id });
    }
  },
  Mutation: {
    addUser: async (parent, { first_name, last_name, email, password }) => {
      const customer = await Customer.create({ first_name, last_name, email, password });
      const token = signToken(customer);
      return { token, customer };
    },
    login: async (parent, { email, password }) => {
      const customer = await Customer.findOne({ email });

      if (!customer) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await bcrypt.compare(password, customer.password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(customer);

      return { token, customer };
    },
    addProduct: async (parent, args) => {
      return Product.create(args);
    },
    addTransactionMain: async (parent, args) => {
      return TransactionMain.create(args);
    },
    addTransactionDetail: async (parent, args) => {
      return TransactionDetail.create(args);
    },
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

module.exports = resolvers;
