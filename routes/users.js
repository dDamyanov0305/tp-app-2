const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const User = require('../models/User');

router.get('/signup', (req,res)=>{ res.send('signup'); });

router.get('/login', (req,res)=>{ res.send('login'); });

router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/home');
});

router.post('/signup', (req,res)=>{

    //before post req make validation in the client
    const { name, email, password } = req.body;
    
    //check if user exists
    User
        .findOne({email})
        .then(user=>{

            if(user)
                res.send("Email already exists");

            const newUser = new User({name,email,password});

            //encrypt password
            bcrypt.genSalt(10,(err,salt)=>{

                if(err)
                    throw err;
                
                bcrypt.hash(newUser.password, salt, (err, encrypted)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        newUser.password=encrypted;
                        newUser
                            .save()
                            .then(()=>{
                                //redirect with signed in user
                            })
                            .catch(err=>{console.log(err)});
                    }
                });
                
            });
  
    });

});

router.post('/login', (req,res,next)=>{
    passport.authenticate('local', {
        successRedirect:'/home',
        failureRedirect:'/users/login',
    })(req,res,next);
});



module.exports=router;