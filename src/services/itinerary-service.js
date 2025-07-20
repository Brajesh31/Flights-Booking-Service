const Itinerary = require("../mongoose/itinerary")

async function CreateItinerary({itineraryid,userid,flightid,from,to,date,time,passengerCount,price,totalPrice,}){
   try {
     const itinerary = new Itinerary({
        itineraryid ,
        userid ,
        flightid ,
        from ,
        to ,
        date ,
        time ,
        passengerCount ,
        price ,
        totalPrice ,
     })
     await itinerary.save()
     return itinerary
   }
   catch(error){
    throw error
   }
}

async function GetItinerary({itineraryid}){
  try{
  const res = await Itinerary.findOne({itineraryid})
  return res
  }
  catch(error){
    throw error
  }
}

async function FillItinerary(itineraryid,passengers){
  try{
    await Itinerary.updateOne(
     { itineraryid }, 
     { $set : { passengers } }
   )
  }
  catch(error){
    throw error
  }
}

module.exports = {
    CreateItinerary,
    GetItinerary,
    FillItinerary
}