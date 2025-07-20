const { StatusCodes } = require('http-status-codes')
const {BookingService} = require('../services')
const { ErrorResponse , SuccessResponse }= require('../utils/common')

const inMemDb = {};

async function createBooking(req,res){
    try{
        const booking = await BookingService.createBooking({
            flightInstanceId : req.body.flightInstanceId,          
            userId : req.body.userId,
            totalCost : req.body.totalCost,
            noofSeats : req.body.noofSeats,
            itineraryid : req.body.itineraryid,
            bookingid : req.body.bookingid
        }) 
        SuccessResponse.data=booking
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
    }catch(error){
       ErrorResponse.error=error
       return res
               .status(StatusCodes.INTERNAL_SERVER_ERROR)
               .json(ErrorResponse)
    }
}

async function getBooking(req,res){
    try{
        const booking = await BookingService.getBooking({
            bookingid : req.params.bookingid
        }) 
        SuccessResponse.data=booking
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
    }catch(error){
       ErrorResponse.error=error
       console.log(error)
       return res
               .status(StatusCodes.INTERNAL_SERVER_ERROR)
               .json(ErrorResponse)
    }
}



async function makePayment(req,res) {
     try {
        const idempotencyKey = req.headers['x-idempotency-key'];
        if( !idempotencyKey ) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message: 'idempotency key missing'});
        }
        if(inMemDb[idempotencyKey]) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message: 'Cannot retry on a successful payment'});
        } 
        console.log(req.body)
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingid: req.body.bookingid
        });
        inMemDb[idempotencyKey] = idempotencyKey;
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
 }
 

module.exports = {
    createBooking,
    getBooking,
    makePayment,
}