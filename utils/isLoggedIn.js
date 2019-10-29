const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('info', 'Authentication Required');
  res.redirect("/login");
}

module.exports = isLoggedIn;