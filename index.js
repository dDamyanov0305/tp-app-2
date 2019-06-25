const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//get db key
const db = require("./config/keys").MongoURI;

//connect to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(()=>{console.log('Connected to mongo')})
    .catch((err)=>{console.log(err)});

app.use('/users', require('./routes/users.js').router);
app.use('/cars', require('./routes/cars.js'));

app.get('/', (req,res) =>{ res.send('root'); });

const PORT = process.env.PORT||5000;

app.listen(PORT,()=>{console.log(`Server started on port ${PORT}`)});
