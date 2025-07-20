const axios = require('axios')
const AppError = require('../utils/errors/app-error')
const { BookingRepository } = require('../repositories')
const db = require('../models')
const { StatusCodes } = require('http-status-codes')
const { ServerConfig } = require('../config')

const bookingRepository=new BookingRepository


async function createBooking(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const booking = await bookingRepository.create(data, transaction)      

        await transaction.commit();
        return booking;
    } catch(error) {
        await transaction.rollback();
        throw error;
    }   
}

async function getBooking(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const booking = await bookingRepository.get(data, transaction)      
        await transaction.commit()
        return booking;
    } catch(error) {
        await transaction.rollback()
        throw error
    }   
}

async function makePayment(data) {
   const transaction = await db.sequelize.transaction() 
   try{
    console.log(data)
     const bookingDetails = await bookingRepository.get(data , transaction)
     if(bookingDetails.status =="cancelled"){
       throw new AppError('The booking has expired',StatusCodes.BAD_REQUEST)
     }
     if(bookingDetails.status =="booked"){
       throw new AppError('Already paid for the flight',StatusCodes.BAD_REQUEST)
     }
     const bookingTime = new Date(bookingDetails.createdAt)
     const currentTime = new Date()
     if(currentTime-bookingTime > 1000*300) {
        await cancelBooking ( data )
        throw new AppError('The booking has expired', StatusCodes.BAD_REQUEST)
    }
     if(bookingDetails.dataValues.totalCost != data.totalCost){
        throw new AppError('The amount of the payment doesnt match', StatusCodes.BAD_REQUEST);
     }
     if(bookingDetails.dataValues.userId != data.userId){
        throw new AppError('The user corresponding to booking doesnt match', StatusCodes.BAD_REQUEST);
     }

     // we assume payment is successful   
     await bookingRepository.update(data.bookingid,{status :'BOOKED'} , transaction)
     await transaction.commit()
   } catch(error){
      await transaction.rollback()
      throw error
   }
}


async function cancelBooking(data){
    console.log(data)
    const transaction = await db.sequelize.transaction()
    try{
        const bookingDetails = await bookingRepository.get(data.bookingId , transaction)
        console.log( bookingDetails)
        if(bookingDetails.status == "cancelled"){
            await transaction.commit()
            return true;
        }
         await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flight/${bookingDetails.flightId}/seats`,{
            seats : bookingDetails.noofSeats,
            dec : 0
        })   
           await bookingRepository.update(data.bookingId , {status :"cancelled" }, transaction)
           await transaction.commit()    
    }
    catch(error){
       await transaction.rollback()
       throw error
    }
}

async function cancelOldBooking(){
    try{
       const time = new Date( Date.now() - 1000*300 )
       const response = await bookingRepository.cancelOldBooking(time)
       return response
    } catch(error){
        console.log(error)
    }
}

module.exports = {
    createBooking,
    getBooking,
    cancelBooking,
    makePayment,
    cancelOldBooking
}