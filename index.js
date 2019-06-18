const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
<<<<<<< HEAD
=======
const session = require("express-session");
const generalRouter = express.Router();
const bodyParser = require('body-parser');
>>>>>>> a64c29c1b9eef98cff823bdbaecf79e351b0eba2

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


//enable body parsing
//app.use(express.urlencoded({ extended:false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', require('./routes/users.js'));
app.use('/car', require('./routes/cars.js'));
app.use('/', (req,res) => res.send("henlo"));

const PORT = process.env.PORT||5000;

app.listen(PORT,()=>{console.log(`Server started on port ${PORT}`)});
