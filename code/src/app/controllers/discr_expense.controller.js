const { nextTick } = require('process');
const Discr_expense = require('../models/discr_expense.model');

// Create and Save a new Discretionary expense Object into the DB.
exports.create = (req, res) => {
    const _discr_expense = new Discr_expense({
        DISC_EXPID: req.body.DISC_EXPID,
        NAME: req.body.NAME,
        AMOUNT: req.body.AMOUNT,
        HOW_OFTEN: req.body.HOW_OFTEN,
        PRIORITY: req.body.PRIORITY,
        USERID: req.body.USERID,
      });

    Discr_expense.create(_discr_expense ,(err, data) => {
        res.send(data);
        });
    };

//Grab all Discr expenses for a certain User based on their ID.
exports.getUserDiscr_expense = (req, res) => {
    const _discr_expense = new Discr_expense({
        USERID: req.body.USERID,
    });

    Discr_expense.getUserDiscr_expense(_discr_expense, (err, data) => {
        res.send(data);
    });
};

//Update specific discr expenses
exports.updateDiscrExp = (req, res) => {
    const _discr_expense= new Discr_expense({
        DISC_EXPID: req.body.DISC_EXPID,
        NAME: req.body.NAME,
        AMOUNT: req.body.AMOUNT,
        HOW_OFTEN: req.body.HOW_OFTEN,
        PRIORITY: req.body.PRIORITY,
        USERID: req.body.USERID,
    });

    Discr_expense.findByDiscrExpId(_discr_expense, (err, data) => {
        Discr_expense.updateDiscrExp(_discr_expense, (err, data) => {
            res.send(data);
        });
    });
};

exports.remove = (req, res) => {
    const _discr_expense = new Discr_expense({
        DISC_EXPID: req.body.DISC_EXPID
      });

      Discr_expense.remove(_discr_expense, (err, data) => {
          res.send(data);
      });
    
}

exports.removeAll = (req, res) => {
    const _discr_expense = new Discr_expense({
        USERID: req.body.USERID
    });

    Discr_expense.removeAll(_discr_expense, (err, data) => {
        res.send.data;
    })
    res.send("Deleted All Discretionary Expenses For: " + _discr_expense.USERID);
};