const router = require('express').Router();

// creating a middleware to check if a user has been logged in or not
 const authCheck = (req, res , next) =>{
   //if the user is Authenticated => it will be available as req.user thanks to passport
   if(!req.user){
     // if user is not logged in => redirect him/her to the login SCREEN
     res.redirect('/auth/login');
   }else{
     // if user is logged in carry on and execute the next call back defined after MiddleWare
     next();
   }
 }

router.get('/', authCheck , (req, res) =>{
 // res.send('Yo logged in using that profile:  ' + req.user.username);
 res.render('profile', {user : req.user});
});

module.exports = router ;
