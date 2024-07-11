// Importing the mongoose library for MongoDB connection
const mongoose = require('mongoose');

// Importing models for database operations
const { Customer, Product, TransactionMain, TransactionDetail } = require('../models');

// Importing seed data from JSON files
const customerData = require('./customerData.json');
const productData = require('./productData.json');
const transactionMainData = require('./transactionMainData.json');
const transactionDetailData = require('./transactionDetailData.json');

// Connecting to MongoDB using environment variable or default local database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TeamGoat_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Asynchronous function to seed the database
const seedDatabase = async () => {
  try {
    // Deleting existing data in collections to avoid duplicates
    await Customer.deleteMany({});
    await Product.deleteMany({});
    await TransactionMain.deleteMany({});
    await TransactionDetail.deleteMany({});

    // Inserting seed data into collections
    const customers = await Customer.insertMany(customerData);
    const products = await Product.insertMany(productData);

    // Mapping transaction main data to associate with customers
    const transactionMainEntries = transactionMainData.map((transaction, index) => {
      transaction.customer_id = customers[index % customers.length]._id;
      return transaction;
    });

    // Inserting mapped transaction main data
    const transactionMains = await TransactionMain.insertMany(transactionMainEntries);

    // Mapping transaction detail data to associate with transactions and products
    const transactionDetailEntries = transactionDetailData.map((detail, index) => {
      detail.transaction_id = transactionMains[index % transactionMains.length]._id;
      detail.product_id = products[index % products.length]._id;
      return detail;
    });

    // Inserting mapped transaction detail data
    await TransactionDetail.insertMany(transactionDetailEntries);

    // Logging success message and exiting the process
    console.log('Database seeded!');
    process.exit(0);
  } catch (err) {
    // Logging error message and exiting the process with failure code
    console.error(err);
    process.exit(1);
  }
};

// Calling the seed function to execute the seeding process
seedDatabase();
