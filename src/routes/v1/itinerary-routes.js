const express = require('express')
const { ItineraryController}=require('../../controllers')
const router=express.Router()

// api/v1/airplanes  POST
router
    .post('/',
        ItineraryController.Createitinerary)

    .get('/:itineraryid',
       ItineraryController.GetItinerary)
       
    .patch('/:itineraryid',
       ItineraryController.FillItinerary 
    )       

module.exports= router