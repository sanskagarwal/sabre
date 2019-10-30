const nodemailer = require("nodemailer");
const config = require("./../config");
const path = require("path");

const sendEmailToUser = (email) => {
  let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email.username,
      pass: config.email.password
    },
    secure: true,
    pool: true
  });

  const message = {
    from: "AItoKeepChildrenSafe@gmail.com",
    to: email,
    subject: "Found Child Family", // Subject line
    html: `
        <p>The family of the child has been notified with your personal information. Report to nearest police information for support.</p>
      `
  };
  transport.sendMail(message, function (err, info) {
    if (err) {
      return;
    } else {
      console.log("Email Sent");
    }
  });
}

module.exports = sendEmailToUser;