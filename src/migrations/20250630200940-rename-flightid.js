'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.renameColumn('Bookings','flightId','flightInstanceId')
  },

  async down (queryInterface, Sequelize) {
      return queryInterface.renameColumn(
      'Bookings',      
      'flightInstanceId',
      'flightId'
      )
  }
};
