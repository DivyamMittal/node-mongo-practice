const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    // console.log("Connection successfull");
}).catch((err) =>{
    // console.log("Error :- ",err);
});