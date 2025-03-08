const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(()=>{
    // console.log("Connection successfull");
}).catch((err) =>{
    // console.log("Error :- ",err);
});