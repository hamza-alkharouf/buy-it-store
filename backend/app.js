const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require('path')

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}


const errorMiddleware = require('./middleware/error')

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
//Route Import
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const category = require("./routes/categoryRoute");

app.use('/api/v1', product)
app.use('/api/v1', user)
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", category);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


//Middleware for error
app.use(errorMiddleware)

module.exports = app