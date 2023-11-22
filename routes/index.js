var express = require('express');
var router = express.Router();
const User = require("../model/usModel");
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(User.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { admin:req.user });
});

router.post('/signup', async function(req, res, next) {
  try {
   const a= await User.register({fullname:req.body.fullname,
      username:req.body.username,
      email:req.body.email,
      no:req.body.no,
      date:req.body.date,


    
    },req.body.password);
 await a.save();
 res.redirect('/login');

  } catch (error) {
    res.send(err);
  }
  
});


router.get('/login', function(req, res, next) {
  res.render('login', { admin:req.user });
});


router.post(
  "/login",
  passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/login",
  }),
  function (req, res, next) {}
);

router.get('/profile',isLoggedIn ,function(req, res, next) {
  res.render('profile', { admin:req.user });
});

router.get("/signout", isLoggedIn, function (req, res, next) {
  req.logout(() => {
      res.redirect("/login");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.redirect("/signin");
  }
}

router.get('/reset', function(req, res, next) {
  res.render('reset', { admin:req.user });
});

router.post('/reset',isLoggedIn ,async function(req, res, next) {
  try {
    await req.user.changePassword(
        req.body.old,
        req.body.new,
    );
    await req.user.save();
    res.redirect("/profile");
} catch (error) {
    res.send(error);
}
});


router.get("/signout", isLoggedIn, function (req, res, next) {
  req.logout(() => {
      res.redirect("/signin");
  });
});

module.exports = router;
