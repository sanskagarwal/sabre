const nodemailer = require("nodemailer");
const config = require("./../config");
const path = require("path");

const sendEmailToUser = (email, userEmail, familyContact) => {
  let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email.username,
      pass: config.email.password
    },
    secure: true,
    pool: true
  });

  let familyContactString = '';
  familyContact.forEach((val, ind) => {
    familyContactString += `
      <tr>
        <th scope="row">${ind + 1}</th>
        <td>${val.name}</td>
        <td>${val.contact}</td>
      </tr>`;
  });

  const message = {
    from: "pantheonbitfest@gmail.com",
    to: email,
    subject: "Missing Child Family Information", // Subject line
    html: `
        <h1>Missing Person's Family Information</h1>

        <h2>Email: ${userEmail}</h2>
        <h2><strong>Contact Information</strong></h2>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Contact No</th>
            </tr>
          </thead>
          <tbody>
            ${familyContactString}
          </tbody>
         </table>
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