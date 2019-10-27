const express = require("express");
const router = express.Router();
const User = require('../models/user');
const isLoggedIn = require('../utils/isLoggedIn');

router.post('/addFamily', isLoggedIn, async (req, res) => {
  try {
    const memberData = {
      name: req.body.name,
      age: req.body.age
    };
    const user = await User.findById(req.user._id);
    user.family.push(memberData);
    await user.save();
    res.redirect('/dashboard');
  } catch (e) {
    console.log(e);
    res.redirect('/dashboard');
  }
});

router.get('/search', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.render('search', {familyData: user.family});
  } catch (e) {
    console.log(e);
    res.redirect('/dashboard');
  }
  
});

router.get('/report', isLoggedIn, (req, res) => {
  res.render('report');
});

module.exports = router;