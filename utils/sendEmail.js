const nodemailer = require("nodemailer");
const config = require("./../config");
const path = require("path");

const sendEmail = (name, contactno, recieverEmail, latitue, longitude, email) => {
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
    from: "pantheonbitfest@gmail.com",
    to: email,
    subject: "Missing Child Information", // Subject line
    html: `
        <p>Hey there</p>

        <p>${name}</p>
        <p>${contactno}</p>
        <p>${recieverEmail}</p>
        <p>Longitue: ${longitude}</p>
        <p>Latitude: ${latitue}</p>
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

module.exports = sendEmail;