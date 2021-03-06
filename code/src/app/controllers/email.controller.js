const Email = require('../models/email.model');

exports.sendEmail = (req, res) => {
    const emailData = new Email({
        userName: req.body.userName,
        name: req.body.name,
        returnEmail: req.body.returnEmail,
        subjectHeader: req.body.subjectHeader,
        emailBody: req.body.emailBody,
    });

    Email.sendEmail(emailData, (err, data) => {
        res.send(data);
    });
    res.send("Email Sent Succesfully!");
};