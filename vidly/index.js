
//let winston=require('winston')
//require('winston-mongodb')
const mongoose = require('mongoose');
let error=require('./middleware/error')

let config=require('config')
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
let users=require('./routes/users')
let auth=require('./routes/auth')

const express = require('express');
const app = express();
require('./startup/prod')(app)

  //winston.add(winston.transports.File,{filename: 'logfile.log'})
  //winston.add(winston.transports.mongoDB,{db: 'mongodb://localhost/vidly'})
  if(!config.get('jwtPrivateKey')){
    console.error('fatal error:jwtPrivateKey')
  }
mongoose.connect(config.get('db'))
  .then(() => console.log('Connected to MongoDB...'+config.get('db')))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users',users)
app.use('/api/auth',auth)
app.use(error)

const port = process.env.PORT || 3000;
let server=app.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports=server