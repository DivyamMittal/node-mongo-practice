const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/chatting-app-db").then(()=>{
    console.log("Connection successfull");
}).catch((err) =>{
    console.log("Error :- ",err);
});