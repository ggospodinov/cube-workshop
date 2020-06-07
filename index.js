const env = process.env.NODE_ENV || 'development';
const mongoose = require('mongoose')
const config = require('./config/config')[env];


const express = require('express');
const indexRouter = require('./routes')
const app = express();


const url=`mongodb+srv://user:softuni@softuni-ivota.mongodb.net/<cubecle>?retryWrites=true&w=majority`
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log(err))

require('./config/express')(app);
app.use('/', indexRouter)

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));