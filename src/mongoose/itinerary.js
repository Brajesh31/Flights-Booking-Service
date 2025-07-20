const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
  itineraryid : {
    type : String,
    required : true
  },
  userid : {
    type : String,
    required : true
  },
  flightid : {
    type : Number,
    required : true
  },
  from : {
    type : String,
    required : true
  },
  to : {
    type : String,
    required : true
  },
  date : {
    type : Date,
    required : true
  },
  time : {
    type: String,
    required: true,
  },
  passengerCount : {
   type : Number,
   required : true
  },
  passengers : [{
   name : String,
   age : Number,
   gender : { type : String , enum : ['MALE','FEMALE','OTHER'] },
   seat : String
  }],
   price : {
    type : Number,
    required : true
  },
  totalPrice : {
    type: Number,
    required : true
  },
  status : {
    type : String,
    enum : ['CHECKOUT','CONFIRM'],
    default: 'CHECKOUT',
    required : true
  }
},{ timestamps : true })

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary