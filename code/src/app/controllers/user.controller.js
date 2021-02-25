const User = require('../models/user.model');

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.email) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
};

    exports.getAll = (req, res) => {
        User.getAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving customers."
            });
          else res.send(data);
        });
      };