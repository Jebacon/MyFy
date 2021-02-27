const { nextTick } = require('process');
const User = require('../models/user.model');

// Create and Save a new User Object into the DB.
exports.create = (req, res) => {
    const user = new User({
        fName: req.params.fName,
        lName: req.params.lName,
        email: req.params.email,
        password: req.params.password
      });

    User.create(user,(err, data) => {
        res.send(data);
        });
    };


exports.getAll = (req, res) => {
    User.getAll((err, data) => {
    if (err)
        res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving users."
        });
        else res.send(data);
    });
};

exports.login = (req, res) => {
    const user = new User({
        email: req.params.email,
        password: req.params.password
    });

    User.login(user, (err, data) => {
        res.send(data);
    });
};

exports.findByEmail = (req, res) => {
    User.findByEmail(req.params.email, (err, data) => {
        if (err) {
            res.send("no user by that email")
        }
        res.send(data);
    });
};

