const app =require('./app')
const cloudinary = require("cloudinary");

const connectDatabase = require('./config/database')

//unhandled Uncaught Rejection
process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due Unhandle Uncaught Rejection`)
    process.exit(1)
})


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
  

//Connecting to database
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
port = process.env.PORT
const server = app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})


//unhandled promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due Unhandle Promise Rejection`)
    server.close(()=>{
        process.exit(1)
    })
})