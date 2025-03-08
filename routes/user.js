const { verifyTokenAndAuth } = require("./verifyToken");
const User = require("../models/usermodel");
const router = require("express").Router();


router.put("/:id", verifyTokenAndAuth ,async (req,resp) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set : req.body,
            },
            {new : true}
        );
        resp.status(200).json(updatedUser);
    }
    catch(e){
        resp.status(500).json(e);
    }
})

router.get("/:id", verifyTokenAndAuth ,async (req,resp) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    }

    try{
        const findUser = await User.findOne();
        resp.status(200).json(findUser);
    }
    catch(e){
        resp.status(500).json(e);
    }
})

module.exports = router;