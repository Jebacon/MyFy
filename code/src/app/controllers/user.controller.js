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
<<<<<<< HEAD
        email: req.body.email,
        password: req.body.password
=======
        email: req.params.email,
        password: req.params.password
>>>>>>> master
      });

      User.remove(user, (err, data) => {
          res.send.data;
      })

      res.send("Deleted: " + user.email)
}

exports.findByEmail = (req, res) => {
    User.findByEmail(req.params.email, (err, data) => {
        if (err) {
            res.send("No user by that email/password.")
        }
        res.send(data);
    });
}

exports.updateEmail = (req, res) => {
    User.findByEmail(req.params.email, (err, data) => {
        const user = new User({
<<<<<<< HEAD
            email: req.body.email,
            newEmail: req.body.newEmail,
=======
            email: req.params.email,
            newEmail: req.params.newEmail,
>>>>>>> master
          });

          User.updateEmail(user, (err, data) => {
              res.send.data;
          })
        res.send("Updated Email!");
    });
}

exports.updatePassword = (req, res) => {
    User.updatePassword(req.params.email, (err, data) => {
        const user = new User({
<<<<<<< HEAD
            email: req.body.email,
            password: req.body.password
=======
            email: req.params.email,
            password: req.params.password
>>>>>>> master
          });

          User.updatePassword(user, (err, data) => {
              res.send.data;
          })
        res.send("Updated Password!");
    });
};

