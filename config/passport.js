const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports=(passport)=>{
    passport.use(
        new LocalStrategy({ usernameField:'email' }, (email, password, done)=>{
            
            User
                .findOne({email})
                .then(user=>{

                    if(!user)
                        return done(null, false, { msg:'Invalid email' });
                    

                    bcrypt.compare(password, user.password, (err, match)=>{
                        if(err)
                            throw err;

                        if(match){
                            return(done, user);
                        }
                        else{
                            return done(null, false, { msg:'Incorrect password' });
                        }
                    })

                })
                .catch(err=>{
                    console.log(err);
                })

        })
    )

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            done(err, user);
        })
    })
}
