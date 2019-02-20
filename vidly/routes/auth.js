let jwt=require('jsonwebtoken')
let config=require('config')
let bcrypt=require('bcrypt') 
let loasash=require('lodash')
let {User}=require('../models/user')
let express=require('express')
let mongoose=require('mongoose')
let Joi=require('joi')
let router=express.Router()

router.get('/',async(req,res)=>{
        let users=await User.find().select('name')
        res.send(users)

})

router.post('/',async(req,res)=>{
    const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message+'lawada');
  let users=await User.findOne({email:req.body.email})
  if(!users)return res.status(400).send('invalid username or password')

  let validpassword=await bcrypt.compare(req.body.password,users.password)
  if(!validpassword)return res.status(400).send('invalid username or password')
let token=users.generateAuthToken()
  res.send(token)
  


//name:req.body.name
//email:req.body.email
//password:req.body.password
//for more complexity in passwords use library npm install joi-password-complexity  


  //await users.save()
   
   //res.send(loasash.pick(users,['_id','name','email']))

})

function validate(req)
{
    let schema={
        email:Joi.string().required().email(),
        password:Joi.string().required()
    }
    return Joi.validate(req,schema)
}


module.exports=router