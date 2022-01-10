const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
module.exports = (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({error:"No token provideded"})
    }
    const parts=authHeader.split(' ')

    if(!parts.length===2) res.json({error:'token error'})

    const [scheme,token]= parts
    if(!/^Bearer$/i.test(scheme))
    return res.status(401).json({error:'token not formated'})

    jwt.verify(token,authConfig.secret,(err,decoded)=>{
        if(err)  return res.status(401).json({error:"Invalid token"})
        req.userId = decoded.id
        return next()

    })
   
}