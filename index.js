const express = require('express');
require("./db/config");
const app = express();

const userRouter = require("./routes/auth");
const user = require("./routes/user");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use('/api',userRouter);
app.use('/api/users',user);

app.listen(process.env.PORT, ()=> {
})

