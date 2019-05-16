const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT||5000;

const db = require("./config/keys").MongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(()=>{console.log('Connected to mongo')})
    .catch((err)=>{console.log(err)});



app.use(express.urlencoded({ extended:false }));

app.use('/',(req,res)=>{res.send("henlo")});



app.listen(PORT,()=>{console.log(`Server started on port ${PORT}`)});

