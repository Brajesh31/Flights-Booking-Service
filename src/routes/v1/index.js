const express = require('express')
const bookingRoutes = require('./booking-routes.js')
const itineraryRoutes = require('./itinerary-routes.js')

const router=express.Router()

router.use('/bookings',bookingRoutes)
router.use('/itinerary',itineraryRoutes)

module.exports=router; 