const Email = require('../models/email.model');

exports.sendEmail = (req, res) => {
    const emailData = new Email({
        userName: req.body.userName,
        name: req.body.name,
        returnEmail: req.body.returnAddress,
        subjectHeader: req.body.subjectHeader,
        emailBody: req.body.emailBody,
    });

    Email.sendEmail(emailData, (err, data) => {
        res.send(data);
    });
};