const jwt = require('jsonwebtoken');

let jwtSecretKey = process.env.JWT_SECRET_KEY;

const verifyToken=(req,res,next)=>{
    let token=req.headers.token;
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        const decodedString = decoded.role;
        req.role=decodedString;
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        return res.status(401).json({message:"No/Invalid token"});
    }
}

module.exports=verifyToken;