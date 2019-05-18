const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require("express-session");
const generalRouter = express.Router();

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

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

generalRouter.get('/',(req,res)=>{res.send('henlo')});

app.use('/', generalRouter);
app.use('/users', require('./routes/users.js'));
app.use('/test', (req,res)=>{res.send("test")});



const PORT = process.env.PORT||5000;

app.listen(PORT,()=>{console.log(`Server started on port ${PORT}`)});

