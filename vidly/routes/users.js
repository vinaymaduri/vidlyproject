let bcrypt=require('bcrypt') 
let auth=require('../middleware/auth')
let loasash=require('lodash')
let {User,validate}=require('../models/user')
let express=require('express')
let jwt=require('jsonwebtoken')
let config=require('config')
let mongoose=require('mongoose')
let router=express.Router()



router.get('/me',auth,async(req,res)=>{
  
        let users=await User.findById(req.users._id).select('-password')
        res.send(users)

})

router.post('/',async(req,res)=>{
    const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message+'lawada');
  let users=await User.findOne({email:req.body.email})
  if(users)return res.status(400).send('user already exist')
  

  
   users=new User(loasash.pick(req.body,['name','email','password']))
   

   let salt=await bcrypt.genSalt(10)
   users.password=await bcrypt.hash(users.password,salt)
//name:req.body.name
//email:req.body.email
//password:req.body.password
//for more complexity in passwords use library npm install joi-password-complexity  


  await users.save()
  let token=users.generateAuthToken()

   
   res.header('x-auth-token',token).send(loasash.pick(users,['_id','name','email']))

})

module.exports=router