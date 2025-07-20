const express=require('express')
const {ServerConfig}=require('./config')
const apiRoutes=require('./routes') 
const  CRONS = require('./utils/common/cron-jobs');
const { default: connectDB } = require('./config/mongodb-config');
const cors = require('cors');

connectDB();
const app=express()

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',apiRoutes)

app.listen(ServerConfig.PORT,async ()=>{
    console.log(`Sever Running on port :${ServerConfig.PORT}`) 
    CRONS();
})