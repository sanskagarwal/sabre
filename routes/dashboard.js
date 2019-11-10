const express = require("express");
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const { URL } = require('url');
const router = express.Router();
const User = require('../models/user');
const CameraLocation = require('./../models/location');
const Lost = require('./../models/lost');
const isLoggedIn = require('../utils/isLoggedIn');
const getCentroid = require('./../utils/getCentroid');
const sendEmail = require('./../utils/sendEmail');
const sendEmailtoUser = require('./../utils/sendEmailToUser');

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
    req.flash('error', 'Server Error');
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

router.get('/report', (req, res) => {
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

const upload2 = multer({ storage: storage2 });

router.post('/report', upload2.single('image'), async (req, res) => {
  const { name, email, contactno, latitude, longitude } = req.body;
  try {
    exec(`python3 -u pythonWithNode/compare_faces.py public/lostPersons/${req.file.filename}`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return res.send({ status: 500 });;
      }
      const pythonOutput = stdout.split('\n');
      if (Number(pythonOutput[1]) === 1) {
        const imageName = pythonOutput[2];
        const imageId = imageName.split('-')[0];
        User.findById(imageId, (err, user) => {
          if (err) {
            console.log(err);
            return res.send({ status: 500 });
          }
          if (!user) {
            console.log("User not found");
            return res.send({ status: 200, found: 0, msg: "Unable to find the user" });
          }
          res.send({ status: 200, found: 1 });

          const url = new URL('http://localhost:3000/map');
          url.searchParams.append('lat', latitude);
          url.searchParams.append('long', longitude);
          url.searchParams.append('name', name);
          url.searchParams.append('email', email);
          url.searchParams.append('contact', contactno);
          sendEmail(name, contactno, email, latitude, longitude, user.email, url.href);
          sendEmailtoUser(email);
        });
      } else {
        console.log("Not found, Do nothing");
        res.send({ status: 200, found: 0, msg: pythonOutput[2] });
      }
    });
  } catch (e) {
    console.log(e);
    res.send({ status: 500 });
  }
});

router.post('/findMember', isLoggedIn, upload2.single('recentImg'), async (req, res) => {
  try {
    const memberId = req.body.memberId;
    const lastSeen = req.body.lastSeen;
    const polygonCoords = JSON.parse(req.body.polygonCoords);
    const centroidResult = getCentroid(polygonCoords.coordinates[0]);
    if (centroidResult.status !== 1) {
      throw 'Server Error';
    }

    const member = req.user.family.filter(value => value._id == memberId); // No Type Coercion Required
    const cams = await CameraLocation.find({
      location: {
        $geoWithin: {
          $centerSphere: [[centroidResult.Cx, centroidResult.Cy], 200 / (6378.1 * 1000)] // 200 metres radius
        }
      }
    });
    console.log(cams); // Location of Cameras (Send to Model)

    const lostMember = new Lost({
      member: member[0],
      lastSeen,
      recentImg: req.file ? ('lostPersons/' + req.file.filename) : null
    });
    await lostMember.save();
    res.send({ success: 200, cams, centroidResult });
  } catch (e) {
    console.log(e);
    req.flash('error', 'Server error');
    res.redirect('/dashbaord');
  }
});

module.exports = router;