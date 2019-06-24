const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require("express-session");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

require('./config/passport')(passport);

//get db key
const db = require("./config/keys").MongoURI;

//connect to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(()=>{console.log('Connected to mongo')})
    .catch((err)=>{console.log(err)});



app.use(passport.initialize());
app.use(passport.session());

app.use('/user', require('./routes/user.js'));
//app.use('/car', require('./routes/cars.js'));
app.get('/', (req,res) =>{ res.send('root'); });

const PORT = process.env.PORT||5000;

app.listen(PORT,()=>{console.log(`Server started on port ${PORT}`)});
