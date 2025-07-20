'use strict';

const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Bookings', 'itineraryid', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
    await queryInterface.addColumn('Bookings', 'bookingid', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.removeColumn('Bookings', 'itineraryid');
      await queryInterface.removeColumn('Bookings', 'bookingid');
  }
};
