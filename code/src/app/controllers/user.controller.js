const User = require('../models/user.model');

// Create and Save a new User Object into the DB.
exports.create = (req, res) => {
    console.log(req.params);

    const user = new User({
        fName: req.params.fName,
        lName: req.params.lName,
        email: req.params.email,
        password: req.params.password
      });

      User.findByEmail(user, (err, data) => {
          if (err) {
              console.log(err);
              res.status(500).send({
                  message: err.message || "That email is already in use!"
              })
          }
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
    })
}

