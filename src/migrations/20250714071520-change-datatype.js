'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Bookings', 'userId', {
      type: DataTypes.STRING,
      allowNull: false
    })
    await queryInterface.changeColumn('Bookings', 'itineraryid', {
      type: DataTypes.STRING,
      allowNull: false
    })
    await queryInterface.changeColumn('Bookings', 'bookingid', {
      type: DataTypes.STRING,
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.changeColumn('Bookings', 'userId', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
    await queryInterface.changeColumn('Bookings', 'itineraryid', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
    await queryInterface.changeColumn('Bookings', 'bookingid', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
  }
};
