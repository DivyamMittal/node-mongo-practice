const User = require("../models/user");
const CryptoJS = require("crypto-js");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

// REGISTER API
router.post('/register', async (req, resp) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    });

    try {
        const savedUser = await newUser.save();
        resp.status(201).send({ "status": 200, "message": "Account created successfully" });
    }
    catch (e) {
        console.log("Error : ", e);
        resp.status(400).send({ "status": 400, "message": "Account already exists" });
    }
});

// LOGIN API
router.post('/login', async (req, resp) => {


    try {
        const user = await User.findOne({ username: req.body.username });
        if(!user){
            return resp.status(400).json({ "status": 400, "message": "This username doesn't exists" });
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const originalPass = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(originalPass !==req.body.password){
            return resp.status(400).json({ "status": 400, "message": "Incorrect password" });;
        }

        const accessToken = jwt.sign({
            id:user._id,
            username:user.username
        },process.env.JWT_SECRET, {expiresIn : "3d"}); 

        user.accessToken = accessToken;
        await user.save();


        const {password,_id,__v , ...others} = user._doc;

       return resp.status(200).json({ "status": 200, "message": "Login succesfull", "data": {...others,accessToken }});
    }
    catch (e) {
        console.log("Error : ", e);
        resp.status(500).send({ "status": 400, "message": "Internal Server error" });
    }
});

module.exports = router;