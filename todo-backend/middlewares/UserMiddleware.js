const {User} = require('../db/index')
const jwt = require("jsonwebtoken")
function UserMiddleware(req,res,next){
    const token = req.headers.authorization
    const words = token.split(' ');
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken,process.env.JWT_SECRET)

    if(decodedValue.username){
        req.username = decodedValue.username
        next();
    }
    else{
        res.status(403).json({
            msg:"You are not authenticated"
        })
    }


}
module.exports = UserMiddleware