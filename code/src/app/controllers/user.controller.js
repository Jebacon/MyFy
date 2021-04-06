const { nextTick } = require('process');
const User = require('../models/user.model');

//Controller code to handle the passing of requests and parsing the JSON body to the proper model method.

// Controller method to handle User Create requests.
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

//Test method to find all Users, basically to test if API is working.
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

//Login function.
exports.login = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    User.login(user, (err, data) => {
        res.send(data);
    });
};

//Delete User, Email and Password Combination required.
exports.remove = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
      });

      User.remove(user, (err, data) => {
          if (err) {
              res.send("No user found for that email/password combinaton.")
          }
          res.send(data);
      })

      res.send("Deleted: " + user.email)
}

///Controller Method updates User Email.
exports.updateEmail = (req, res) => {
    User.findbyEmail(req.params.email, (err, data) => {
        const user = new User({
            email: req.body.email,
            newEmail: req.body.newEmail,
          });

          User.updateEmail(user, (err, data) => {
              res.send(data);
          })
        res.send("Updated Email!");
    });
}

//Controller method to update Password.
exports.updatePassword = (req, res) => {
    User.updatePassword(req.body.password, (err, data) => {
        const user = new User({
            email: req.body.email,
            password: req.body.password
          });

          User.updatePassword(user, (err, data) => {
              res.send(data);
          })
        res.send("Updated Password!");
    });
};



exports.updatefName = (req, res) => {
    User.findByEmail(req.body.email, (err, data) => {
        const user = new User({
            email: req.body.email,
            fName: req.body.fName
          });

          User.updatefName(user, (err, data) => {
              res.send(data);
          })
    });
};

exports.updatelName = (req, res) => {
    User.findbyEmail(req.params.email, (err, data) => {
        const user = new User({
            email: req.body.email,
            lName: req.body.lName
          });

          User.updatelName(user, (err, data) => {
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