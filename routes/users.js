const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createUser=(req,res)=>{

    const { name, email, password } = req.body;
    console.log(req.body);
    
    //check if user exists
    User.findOne({email}).then(user=>{

        if(user)
            res.send("Email already exists");

        const newUser = new User({name,email,password});

        //encrypt password
        bcrypt.genSalt(10,(err,salt)=>{

            if(err){
                console.log(err);
                res.sendStatus(500);
            }
            
            bcrypt.hash(newUser.password, salt, (err, encrypted)=>{
                if(err){
                    console.log(err);
                    res.sendStatus(500);
                }
                else{
                    newUser.password=encrypted;
                    newUser
                        .save()
                        .then(()=>{
                            console.log('redirectva');
                            jwt.sign({user:newUser}, 'secretkey', (err, token) => {
                                res.json({user:newUser,token:token});
                            });
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.sendStatus(500);
                        });
                }
            });
                
            });
  
    });
}

const logIn = (req,res)=>{
    User
    .findOne({email:req.body.email})
    .then(data=>{
        if(!data)
            res.sendStatus(404);

            bcrypt.compare(req.body.password, data.password, (err, match)=>{
                if(err)
                    throw err;
    
                if(match){
                    console.log('stiga');
                    jwt.sign({user:data}, 'secretkey', (err, token) => {
                        res.json({user:data,token:token});
                    });
                }
                else{
                    res.sendStatus(403);
                }
            })
        
    })

}

const verifyToken=(req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  
  }


router.post('/create', createUser);

router.post('/login', logIn);

router.post('/delete' , (req,res)=>{
    User.findOneAndDelete({id:req.body.id},(err,doc)=>{
        if(err){
            res.sendStatus(500);
        }
        res.sendStatus(200);
    })
});

router.post('/update',(req,res)=>{
    User.findOneAndUpdate({id:req.body.id},{...req.body.user},(err,doc)=>{
        if(err)res.sendStatus(500);
        res.sendStatus(200);
    })
})

module.exports={router,verifyToken};