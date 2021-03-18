const { nextTick } = require('process');
const Income = require('../models/income.model');

// Create and Save a new User Object into the DB.
exports.create = (req, res) => {
    const _income = new Income({
        SRCNAME: req.params.SRCNAME,
        AMOUNT: req.params.AMOUNT,
        PAYCYCLE: req.params.PAYCYCLE,
        USERID: req.params.USERID
      });

    Income.create(_income,(err, data) => {
        res.send(data);
        });
    };


exports.getAll = (req, res) => {
    Income.getAll((err, data) => {
    if (err)
        res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving users."
        });
        else res.send(data);
    });
};
exports.updateById = (req, res) => {
    Income.updateById(req.params.SRCNAME, req.params.AMOUNT, req.params.PAYCYCLE, req.params.INCOMEID, req.params.USERID,(err, data) => {
        const _income = new Income({
            SRCNAME: req.params.SRCNAME,
            AMOUNT:req.params.AMOUNT,
            PAYCYCLE: req.params.PAYCYCLE,
            USERID: req.params.USERID,
          });

          Income.updateById(_income, (err, data) => {
              res.send.data;
          });
        res.send("Updated Income entry!");
    });
}
exports.remove = (req, res) =>{
    const _income = new Income({
        SRCNAME: req.params.SRCNAME,
        USERID: req.params.USERID
    })

    Income.remove(_income,(err, data) =>{
        res.send.data;
    })
    res.send("Deleted: " + _income.SRCNAME)
}
