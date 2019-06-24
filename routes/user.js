const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const User = require('../models/User');
const { forwardAuthenticated , ensureAuthenticated } = require('../config/auth');

const createUser=(req,res,next)=>{

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
    console.log('logInNewUser');
    passport.authenticate('local', {
        successRedirect:'/users/',
        failureRedirect:'/users/login',
    })(req,res,next);
}

router.get('/',(req,res)=>{
    User.find({},(err,users)=>{
        res.json(users);
    });
});

router.get('/signup', (req,res)=>{ res.send('signup page'); });

router.get('/login', (req,res)=>{ res.send('login page'); });

router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/');
});

router.post('/signup', createUser, logInNewUser);

router.post('/login', logInNewUser);

router.post('/delete', ensureAuthenticated , (req,res)=>{
    User.deleteOne()
});

module.exports=router;