const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoute = require('./routes/profile-route');

require('./config/passport-setup');// has to be required here in order to be functional otherwise it won't => notice that we do not store this require statement inside of any const because we don t have to  => the whole idea is : grabbing those lines of code and execute them here even if the file does not export anything
// requiring this file here has the Same effect of copy pasting those line of code here!!
const cookieSession = require('cookie-session');

const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');

const app = express();

// set view engine => serve some dynamic templates to the user
app.set('view engine', 'ejs');

// setting up our cookie Session => this is used to ecrypt the id we send along to the browser in order to make a bit safer
 app.use(cookieSession({
   maxAge : 24 * 60 * 60 * 1000 ,// equivalent of 1 day in Milliseconds
   keys : [keys.session.cookieKey] //here goes the string that will ENCRYPT our Cookie => the string has to be unique of course => go to key.js and create one
 }));

 app.use(passport.initialize());//initiliazing passport
 app.use(passport.session())  ; // using the session we dfined above
// connecting to DB
mongoose.connect(keys.mongodb.dbURI, () => console.log('connection has been esablished to the Database'));


// set up routes => we treat those external routes as MiddleWare!!
app.use('/auth', authRoutes);
app.use('/profile',profileRoute );


// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
