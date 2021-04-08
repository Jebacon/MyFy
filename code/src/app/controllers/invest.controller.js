const { nextTick } = require('process');
const Invest = require('../models/invest.model');

// Create and Save a new User Object into the DB.
exports.create = (req, res) => {
    const invest = new Invest({
        investName: req.body.investName,
        investAmount: req.body.investAmount,
        srcAccount: req.body.srcAccount,
        destAccount: req.body.destAccount,
        userId: req.body.userId,
      });

    Invest.create(invest ,(err, data) => {
        res.send(data);
        });
    };

//Grab all Investments for a certain User based on their ID.
exports.getUserInvestments = (req, res) => {
    const invest = new Invest({
        userId: req.body.userId,
    });

    Invest.getUserInvestments(invest, (err, data) => {
        res.send(data);
    });
};
exports.getUserInvestmentSum = (req, res) => {
    const invest = new Invest({
        userId: req.body.userId,
    });

    Invest.getUserInvestmentSum(invest, (err, data) => {
        res.send(data);
    })
}
//Update specific investments 
exports.updateInvestments = (req, res) => {
    const invest = new Invest({
        investId: req.body.investId,
        investName: req.body.investName,
        investAmount: req.body.investAmount,
        srcAccount: req.body.srcAccount,
        destAccount: req.body.destAccount
       // newInvestName: req.body.newInvestName,
       // newInvestAmount: req.body.newInvestAmount,
       // newSrcAccount: req.body.newSrcAccount,
       // newDestAccount: req.body.newDestAccount
    });

    Invest.findbyInvestId(invest, (err, data) => {
        Invest.updateInvestments(invest, (err, data) => {
            res.send(data);
        });
    });
};

exports.remove = (req, res) => {
    const invest = new Invest({
        investId: req.body.investId
      });

      Invest.remove(invest, (err, data) => {
          res.send.data;
      });
      //res.send("Deleted Investment ID: " + invest.investId)
}

exports.removeAll = (req, res) => {
    const invest = new Invest({
        userId: req.body.userId
    });

    Invest.removeAll(invest, (err, data) => {
        res.send.data;
    })
    res.send("Deleted All Investments For: " + invest.userId);
};