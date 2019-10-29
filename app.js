const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require('./models/user');
const indexRoutes = require('./routes/index');
const dashboardRoutes = require('./routes/dashboard');

const mongoDBURI = "mongodb://localhost:27017/sabre";
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongoDBURI, () => {
  console.log("connected to DB");
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(require("express-session")({
  secret: "cat",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 4320000 }, // 12 Hrs
  store: new MongoStore({
    url: mongoDBURI,
    autoReconnect: true,
  })
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use(dashboardRoutes);

app.listen(3000, function () {
  console.log("Server Running on Local host 3000");
});
