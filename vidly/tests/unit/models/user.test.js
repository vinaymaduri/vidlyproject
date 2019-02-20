let {User}=require('../../../models/user')
let config=require('config')
let mongoose=require('mongoose')
let jwt=require('jsonwebtoken')


describe('user.generateAuthToken',()=>{
    it('should return a valid jwt',()=>

    {
        let payload={_id:new mongoose.Types.ObjectId().toHexString(),isAdmin:true}
        let user=new User(payload)
        let token=user.generateAuthToken()
        let decoded=jwt.verify(token,config.get('jwtPrivateKey'))
        expect(decoded).toMatchObject(payload)
        })
    })
