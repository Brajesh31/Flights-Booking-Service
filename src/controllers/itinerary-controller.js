const { StatusCodes } = require("http-status-codes")
const { ErrorResponse, SuccessResponse } = require("../utils/common")
const { ItineraryService } = require("../services")


async function Createitinerary(req,res){
   try{
     const itinerary = await ItineraryService.CreateItinerary({
           itineraryid : req.body.itineraryid,
           userid : req.body.userid,
           flightid : req.body.flightid,
           from : req.body.from,
           to : req.body.to,
           date : req.body.date,
           time : req.body.time,
           passengerCount : req.body.passengerCount,
           price : req.body.price,
           totalPrice : req.body.price*req.body.passengerCount
        }) 
        SuccessResponse.data=itinerary
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
   }
   catch(error){
      throw error
   }
}

async function GetItinerary(req,res){
   try{
        const itinerary = await ItineraryService.GetItinerary({
           itineraryid : req.params.itineraryid
         }) 
         SuccessResponse.data=itinerary
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
   }
   catch(error){
     throw error
   }
} 

async function FillItinerary(req,res){
  try{
        const itinerary = await ItineraryService.FillItinerary(
           itineraryid = req.params.itineraryid,
           passengers = req.body.passengers
         ) 
         SuccessResponse.data=itinerary
        return res 
           .status(StatusCodes.OK)
           .json(SuccessResponse)
   }
   catch(error){
     throw error
   }
}


module.exports = {
   Createitinerary,
   GetItinerary,
   FillItinerary
}