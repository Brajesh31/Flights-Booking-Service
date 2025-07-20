'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flightInstanceId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type:DataTypes.ENUM,
      values:['booked','cancelled','initiated','pending'],
      defaultValue:'initiated',
      allowNull: false,
    },
    totalCost: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    noofSeats : {
      type :DataTypes.INTEGER,
      allowNull: false,
      defaultValue:1
     },
    itineraryid : { 
      type : DataTypes.INTEGER,
      allowNull: false,
    },
    bookingid : {
      type : DataTypes.INTEGER,
      allowNull : false
    } 
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};