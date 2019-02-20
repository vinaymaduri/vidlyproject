let jwt =require('jsonwebtoken')
let config=require('config')
function auth(req,res,next)
{
    let token=req.header('x-auth-token')
    if(!token) res.status(401).send('no token or invalid token')
    try{
        let payload=  jwt.verify(token,config.get('jwtPrivateKey'))
        req.users=payload
        next()
    }
    catch(ex){
        res.status(400).send('invalid token')
    }
 

}

module.exports=auth