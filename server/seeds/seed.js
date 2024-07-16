const db = require('../config/connection');
const { Customer } = require('../models');
const { Product } = require('../models');
const { TransactionMain } = require('../models');
const { TransactionDetail } = require('../models');
const customerSeeds = require('./customerData.json');
const productSeeds = require('./productData.json');
const transactionDetailSeeds = require('./transactionDetailData.json');
const transactionMainSeeds = require('./transactionMainData.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {

    await cleanDB('Customer', 'customers');
    await cleanDB('Product', 'product');
    await cleanDB('TransactionMain', 'TransactionMain');
    await cleanDB('TransactionDetail', 'TransactionDetail');


    await Customer.create(customerSeeds);
    await Product.create(productSeeds);
    await TransactionDetail.create(transactionDetailSeeds);
    await TransactionMain.create(transactionMainSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Database seeded!');
  process.exit(0);
});


