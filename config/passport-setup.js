const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

//done mthode is very important when it called => go ahead and serialize the user giviing it the user to serialize

passport.serializeUser((user, done) => {
  // null is for error handling , bacause we are pretty sure that the user has obligatory an Id inside of the DB we can just put null as first parametre
  done(null, user.id);
  // the user id is the _id of the user defibed inside of the Db
  // we take this identifying piece called id and stuff it inside the Cookie
});
// when an Authenticated user wants to go to any other page in our app that requires authentication
// the browser send us back a cookie so we can deserialize it like so
passport.deserializeUser((id, done) => {
       // because we used the id as identifying paramere in the cookie, we now request it
       // in order to deserialize the user that has this special id
     User.findById(id).then((user) =>{
     done(null, user); // Now we have access to this very user => this very Record having the exact id

   })
  // the user id is the _id of the user defibed inside of the Db
  // we take this identifying piece called id and stuff it inside the Cookie
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        // if googleId === profile.id that means that the user has been already Authenticated
        User.findOne({googleId: profile.id}).then((existingUser) => {
            if(existingUser){
                // already have this user
                console.log('user is: ', existingUser);
                done(null, existingUser);// once this is called we go to the serializeUser user function with the existingUser
                // do something
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    // do something
                    done(null, newUser); // once this is called we go to the serializeUser user function with the newUser


                });
            }
        });
    })
);
