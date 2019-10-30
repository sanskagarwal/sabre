const nodemailer = require("nodemailer");
const config = require("./../config");
const path = require("path");

const sendEmail = (name, contactno, recieverEmail, latitude, longitude, email, url) => {
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
    subject: "Missing Child Information", // Subject line
    html: `
      <h3><strong>Person Contact Information</strong></h3>
      <p>Name: ${name}</p>
      <p>Contact Number: ${contactno}</p>
      <p>Email: ${recieverEmail}</p>
      <p>Coordinates: Longitue: ${longitude}, Latitude: ${latitude}</p>
      <a href='${url}'>Map Location</a>
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