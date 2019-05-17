const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');

const app = express();

require('./config/passport')(passport);

//get db key
const db = require("./config/keys").MongoURI;

//connect to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(()=>{console.log('Connected to mongo')})
    .catch((err)=>{console.log(err)});


//enable body parsing
app.use(express.urlencoded({ extended:false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',(req,res)=>{res.send("henlo")});

app.use('/user',require('./routes/users.js'));

const PORT = process.env.PORT||5000;

app.listen(PORT,()=>{console.log(`Server started on port ${PORT}`)});

