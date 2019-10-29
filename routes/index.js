const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require('./../models/user');
const isLoggedIn = require('./../utils/isLoggedIn');

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/register', function (req, res) {
  res.render('register');
});

router.get('/dashboard', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.render('dashboard', { user });
  } catch (e) {
    console.log(e);
  }
});

router.get('/login', function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});

router.post('/register', function (req, res) {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      req.flash('error', err.message);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/dashboard');
    });
  });
});

router.post("/login", passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: true
}), function (req, res) {
  res.redirect('/dashboard');
});

router.get("/logout", function (req, res) {
  req.logout();
  if (req.session) {
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err);
      req.user = null;
      res.redirect('/');
    });
  }
});

module.exports = router;