const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

router.get('/signup', (req,res)=>{ res.send('signup'); });

router.get('/home', (req,res)=>{ console.log('svar6i');res.send('home'); });

router.get('/login', (req,res)=>{ res.send('login'); });

router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/home');
});

router.get('/',(req,res)=>{
    User.find({},(err,users)=>{
        res.json(users);
    })
});

const createUser=(req,res,next)=>{

    const { name, email, password } = req.body;
    console.log(req.body);
    
    //check if user exists
    User
        .findOne({email})
        .then(user=>{

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
                                next();
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

const logInNewUser=(req,res,next)=>{
    console.log('loginva');
    passport.authenticate('local', {
        successRedirect:'/users/home',
        failureRedirect:'/users/login',
    })(req,res,next);
}

router.post('/signup', [createUser, logInNewUser],(req,res)=>{
    res.sendStatus(200);
   
});

router.post('/login', logInNewUser);


module.exports=router;