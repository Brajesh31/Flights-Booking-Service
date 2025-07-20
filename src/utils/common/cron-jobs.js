const cron = require('node-cron');
const { BookingService } = require('../../services')

function scheduleCrons(){
    cron.schedule('*/10 * * * *', async () =>{
      console.log('Starting Cron again')
      const response = await BookingService.cancelOldBooking()
      console.log(response)
    }) 
}

module.exports = scheduleCrons