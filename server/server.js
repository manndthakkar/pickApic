const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cp = require("cookie-parser");
const cloudinary = require("cloudinary");
const path = require('path');

const feedRouter = require("./routes/feed")
const userRouter = require("./routes/user")


require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Mongo DB Connection using Mongoose
const uri =  process.env.ATLAS_URI;
 
mongoose.connect(uri)

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established.");
  })
app.use(cors());

// Using middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(cp());


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
}) 


app.use('/feed', feedRouter);
app.use('/user', userRouter);
 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});