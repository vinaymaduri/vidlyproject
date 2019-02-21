let request=require('supertest')
let server
let {Genre}=require('../../models/genre')

describe('/api/genres',()=>{
    beforeEach(()=>{server=
        require('../../index')})
    afterEach(async()=>{server.close()
        await Genre.remove({})})

    describe('GET /',()=>{
        it('should return all genres',async()=>{

         /*await Genre.collection.insertMany([ {name:'genre1'},{name:'genre2'}])
       let res=await request(server).get('/api/genres')
       expect(res.status).toBe(200)
       expect(res.body.length).toBe(2)*/
    

        })
    })
    describe('GET /:id',()=>{
        it('should return a valid name',async()=>{
          //let genre=new Genre({
            //    name:'genre1'
            //})
            //await genre.save()
            //let res=await request(server).get('/api/genres/'+genre._id)
    
        //expect(res.status).toBe(200)
        //expect(res.body).toHaveProperty('name',genre.name)
        })

        })
        describe('GET /:id',()=>{
            it('should return 404 error if id isivalid',async()=>
            {
                /*let res=await request(server).get('/api/genres/1')

                expect(res.status).toBe(404)*/
            })
        })
        describe('POST /',()=>{
            it('should retun 401 if user is not logged in',async()=>{
                let res=await request(server).post('/api/genres').send({name:'genre1'})
                expect(res.status).toBe(401)
           
            })
        })
     
})