const { nextTick } = require('process');
const Income = require('../models/income.model');

// Create and Save a new income Object into the DB.
exports.create = (req, res) => {
    const _income = new Income({
        SRCNAME: req.body.SRCNAME,
        AMOUNT: req.body.AMOUNT,
        PAYCYCLE: req.body.PAYCYCLE,
        USERID: req.body.USERID
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
        err.message || "Some error occurred while retrieving income."
        });
        else res.send(data);
    });
};
exports.findByIncomeId = (req, res) =>{
    const _income = new Income({
        INCOMEID: req.body.INCOMEID,
        USERID: req.body.USERID,
    });
    Income.findByIncomeId(_income, (err, data) => {
        res.send(data);
        
    })
    
};
exports.updateIncome = (req, res) => {
    const _income = new Income({
        INCOMEID: req.body.INCOMEID,
        USERID: req.body.USERID,
        new_SRCNAME:req.body.new_SRCNAME,           
        new_AMOUNT: req.body.new_AMOUNT,           
        new_PAYCYCLE: req.body.new_PAYCYCLE,      
    });
    Income.findByIncomeId(_income,(err, data) => {       

          Income.updateIncome(_income, (err, data) => {
              res.send(data);
          })
       
    });
}
exports.remove = (req, res) =>{
    const _income = new Income({
        INCOMEID: req.body.INCOMEID,
    });

    Income.remove(_income,(err, data) =>{
        //res.send(data);
        //console.log(data)
    })
    //res.send("Deleted: " + _income.SRCNAME)
}
exports.removeAll = (req, res) => {
    const _income = new Income({
        USERID: req.body.USERID
    });

    Income.removeAll(_income, (err, data) => {
        res.send.data;
    })
    res.send("Deleted All Incomes For: " + _income.USERID);
}
exports.getUserIncome = (req, res) => {
    const _income = new Income({
        USERID: req.body.USERID,
    });

    Income.getUserIncome(_income, (err, data) => {
        res.send(data);
    });
};