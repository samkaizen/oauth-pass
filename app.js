const express = require('express');
const authRoutes = require('./routes/auth-routes');
require('./config/passport-setup');// has to be required here in order to be functional otherwise it won't => notice that we do not store this require statement inside of any const because we don t have to  => the whole idea is : grabbing those lines of code and execute them here even if the file does not export anything
// requiring this file here has the Same effect of copy pasting those line of code here!!

const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// set view engine => serve some dynamic templates to the user
app.set('view engine', 'ejs');

// connecting to DB 
mongoose.connect(keys.mongodb.dbURI, () => console.log('connection has been esablished to the Database'));


// set up routes => we treat those external routes as MiddleWare!!
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
