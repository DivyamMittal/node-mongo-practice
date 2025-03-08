const jwt = require("jsonwebtoken");

const verifyToken = (req,resp,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1]; 
        jwt.verify(token,process.env.JWT_SECRET, (err,user) => {
            if(err) resp.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    }else{
        return resp.status(401).json("You are not authenticated!");
    }
}
 
const verifyTokenAndAuth = (req,resp,next) =>{
    verifyToken(req,resp, ()=>{
        if(req.user.id === req.params.id){
            next();
        }
        else{
            resp.status(401).json("You are not allowed to do that!");
        }
    })
}

module.exports = {verifyToken,verifyTokenAndAuth};