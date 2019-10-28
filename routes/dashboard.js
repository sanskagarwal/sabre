const express = require("express");
const router = express.Router();
const User = require('../models/user');
const CameraLocation = require('./../models/location');
const Lost = require('./../models/lost');
const isLoggedIn = require('../utils/isLoggedIn');
const getCentroid = require('./../utils/getCentroid');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, req.user._id + '-img' + req.user.family.length + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/addFamily', isLoggedIn, upload.single('mypic'), async (req, res) => {
  try {
    const memberData = {
      name: req.body.name,
      age: req.body.age,
      image: 'uploads/' + req.file.filename,
      contact: req.body.contactno
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
    res.render('search', { familyData: user.family });
  } catch (e) {
    console.log(e);
    res.redirect('/dashboard');
  }

});

router.get('/report', isLoggedIn, (req, res) => {
  res.render('report');
});


const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/lostPersons')
  },
  filename: function (req, file, cb) {
    cb(null, 'img' + Date.now() + path.extname(file.originalname));
  }
});

const upload2 = multer({ storage: storage2 })

router.post('/findMember', isLoggedIn, upload2.single('recentImg'), (req, res) => {
  const memberId = req.body.memberId;
  const lastSeen = req.body.lastSeen;
  const polygonCoords = JSON.parse(req.body.polygonCoords);
  const centroidResult = getCentroid(polygonCoords.coordinates[0]);
  if (centroidResult.status !== 1) {
    return console.log("Some error");
  }

  const member = req.user.family.filter(value => value._id == memberId);
  CameraLocation.find({
    location: {
      $geoWithin: {
        $centerSphere: [[centroidResult.Cx, centroidResult.Cy], 200 / (6378.1 * 1000)] // 200 metres radius
      }
    }
  }, (err, cams) => {
    if (err) {
      console.log(err);
      return res.send({ sucess: 500, msg: "Server Error" });
    }
    console.log(cams); // Location of Cameras (Send to Model)
  });

  const lostMember = new Lost({
    member: member[0],
    lastSeen,
    recentImg: req.file ? ('lostPersons/' + req.file.filename) : null
  });

  lostMember.save().then((val) => {
    // Saved To DB
  }).catch((err) => {
    console.log(err);
  })

  res.send({ success: 200 });
});

module.exports = router;