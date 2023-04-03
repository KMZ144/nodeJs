const jwt=require ('jsonwebtoken')
const authMiddleWare=function (req,res,next){
    const token =req.headers.token
    if (!token){
        return res.status(403).json("log in required")
    }
    try{
        const decoded=jwt.verify(token,process.env.TOKEN_KEY)
        req.user=decoded
    }
    catch(err){
        console.log(err);
    }
    return next();
}

module.exports=authMiddleWare;