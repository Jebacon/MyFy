const { nextTick } = require('process');
const Housing = require('../models/housing.model');

// Create and Save a new User Object into the DB.
exports.create = (req, res) => {
    const housing = new Housing({
        ownership: req.params.ownership,        
        costs: req.params.costs,
        userid: req.params.User.id
      });

    Housing.create(housing,(err, data) => {
        res.send(data);
        });
    };


exports.getAll = (req, res) => {
    Housing.getAll((err, data) => {
    if (err)
        res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving housing entries."
        });
        else res.send(data);
    });
};




