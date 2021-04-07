var nodemailer = require('nodemailer');


const Email = function(email) {
    this.userName = email.userName;
    this.name = email.name;
    this.returnEmail = email.returnEmail;
    this.subjectHeader = email.subjectHeader;
    this.emailBody = email.emailBody;
};

Email.sendEmail = (email, result) => {
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'MyFyTeam@gmail.com',
      pass: 'FinalSemester'
    }
  });

  var returnAddresses = ["MyFyTeam@gmail.com", email.returnEmail];
  
  var mailOptions = {
    from: email.returnEmail,
    to: returnAddresses,
    subject: email.subjectHeader,
    text: "From: " + email.name + "\n\n" + email.emailBody
  }
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
}
)};

module.exports = Email;