const { nextTick } = require('process');
const User = require('../models/user.model');

// Create and Save a new User Object into the DB.
exports.create = (req, res) => {
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: req.body.password
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
        email: req.body.email,
        password: req.body.password
    });

    User.login(user, (err, data) => {
        res.send(data);
    });
};

exports.remove = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
      });
      User.remove(user, (err, data) => {
          res.send(data);
      })
}

exports.findByEmail = (req, res) => {
    User.findByEmail(req.body.email, (err, data) => {
        if (err) {
            res.send("No user by that email/password.")
        }
        res.send(data);
    });
}

exports.updateEmail = (req, res) => {
    User.findByEmail(req.body.email, (err, data) => {
        const user = new User({
            email: req.body.email,
            newEmail: req.body.newEmail,
          });

          User.updateEmail(user, (err, data) => {
              res.send(data);
          })
    });
}

exports.updatePassword = (req, res) => {
    User.updatePassword(req.body.newPassword, (err, data) => {
        const user = new User({
            email: req.body.email,
            newPassword: req.body.newPassword
          });

          User.updatePassword(user, (err, data) => {
              res.send(data);
          })
    });
};

exports.updateName = (req, res) => {
    User.findByEmail(req.body.email, (err, data) => {
        const user = new User({
            email: req.body.email,
            fName: req.body.fName,
            lName: req.body.lName
        });

        User.updateName(user, (err, data => {
            res.send(data);
        }))
    })
}

