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
      user: 'brandonpozil@gmail.com',
      pass: '@Houhai7'
    }
  });
  
  var mailOptions = {
    from: email.returnEmail,
    to: 'brandonpozil@gmail.com',
    subject: email.subjectHeader,
    text: email.emailBody
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
}
)};

module.exports = Email;