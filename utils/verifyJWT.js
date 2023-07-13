const jwt = require("jsonwebtoken");
const verifyJWT = async (req, res, next) =>{
    let token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            res.status(400).json({message:"invalid or old jwt "})
        }else {
            req.decode = decoded
            next()
        }
    });
}

module.exports = {verifyJWT}