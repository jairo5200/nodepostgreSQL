'use strict';

const {ORDER_PRODUCT_TABLE,OrderProductSchema} = require('../models/order-product.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    console.log(ORDER_PRODUCT_TABLE);
    console.log(OrderProductSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE,OrderProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
