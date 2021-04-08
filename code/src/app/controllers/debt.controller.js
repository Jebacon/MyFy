const { nextTick } = require('process');
const Debt = require('../models/debt.model');

// Create and Save a new Debt Object into the DB.
exports.create = (req, res) => {
    const debt = new Debt({
        debtName: req.body.debtName,
        balance: req.body.balance,
        rate: req.body.rate,
        payTime: req.body.payTime,
        userId: req.body.userId,
      });

    Debt.create(debt ,(err, data) => {
        res.send(data);
        });
    };

//Grab all Debt for a certain User based on their ID.
exports.getUserDebts = (req, res) => {
    const debt = new Debt({
        userId: req.body.userId,
    });

    Debt.getUserDebts(debt, (err, data) => {
        res.send(data);
    });
};

//Update specific investments 
exports.updateDebt = (req, res) => {
    const debt = new Debt({
        debtName: req.body.debtName,
        balance: req.body.balance,
        rate: req.body.rate,
        paytime: req.body.paytime,
        debtId: req.body.debtId
    });

    Debt.findbyDebtId(debt, (err, data) => {
        Debt.updateDebt(debt, (err, data) => {
            res.send(data);
        });
    });
};

exports.remove = (req, res) => {
    const debt = new Debt({
        debtId: req.body.debtId
      });

      Debt.remove(debt, (err, data) => {
          res.send(data);
      });
      //res.send("Deleted Debt ID: " + invest.investId)
}

exports.removeAll = (req, res) => {
    const debt = new Debt({
        userId: req.body.userId
    });

    Debt.removeAll(debt, (err, data) => {
        res.send.data;
    })
    res.send("Deleted All Debts For: " + debt.userId);
};