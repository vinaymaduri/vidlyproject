let mongoose=require('mongoose')
let Joi=require('joi')
let jwt=require('jsonwebtoken')
let config=require('config')

let userSchema=new mongoose.Schema({
    name:{type:String,
        required:true
         },
         email:{type:String,
        unique:true},
        password:{
            type:String,
            required:true
        },
        isAdmin:Boolean

})
userSchema.methods.generateAuthToken =function()
{
   return jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey')) 
 
}
console.log(config.get('jwtPrivateKey'))
let User=new mongoose.model('User',userSchema)




function validateUser(user)
{
    let schema={
        name:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required()
    }

    return Joi.validate(user,schema)
}

exports.validate=validateUser
exports.User=User
