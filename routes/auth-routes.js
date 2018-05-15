const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google+e  => this will be triggered Once we click sign in with google+ and once clicked this will give us access to the CONSENT SCREEN
router.get('/google', passport.authenticate('google',{
    scope : ['profile'],
}))

// Once we grant permission signing up with our gmail credentials google will fire this route :  /google/redirect
// this  route has been defined of course inside of google + api configuration !
// at this point we can grab a code from the url as query string
// this is an examlpe : http://localhost:3000/auth/google/redirect?code=4/AABijdEf1earZ-LkCfSLztbfuDuR-IKndJtWHGBnFFBiRlREsB95Ygozg6Toh_1b2_rCOmuVhBlCq7V2Xn2cZ74#
//passport.authenticate('google') is a middleware that goes and exchange this code for some profile info from google THEN fires the callback inside of the passport-setup.js before the call back defined here for this handler get executed  ( imean this one : (req, res) =>{
  //  res.send('You Dude, You have been kicked back by google ');
   //})

router.get('/google/redirect', passport.authenticate('google'),/* this callback is the last once to be executed before we execute the callback definded in passport-setup.js*/(req, res) =>{
    //res.send(`the user is  : ${req.user} `); // we can get access to the  authenticated user as req.user
    res.redirect('/profile/'); // once the user has been authenticated just redirect him/her to the
    //profile route which is handled inside of the app.js
})

module.exports = router;
