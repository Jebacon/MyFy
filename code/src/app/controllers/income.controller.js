const { nextTick } = require('process');
const Income = require('../models/income.model');

// Create and Save a new User Object into the DB.
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
    Income.findByIncomeId(req.body.INCOMEID, req.body.USERID,(err, data) => {
     
        const _income = new Income({
                       
            new_SRCNAME:req.body.new_SRCNAME,           
            new_AMOUNT: req.body,new_AMOUNT,           
            new_PAYCYCLE: req.body.new_PAYCYCLE,            
          });

          Income.updateIncome(_income, (err, data) => {
              res.send(data);
          })
        //res.send("Updated Income entry!");
    });
}
exports.remove = (req, res) =>{
    const _income = new Income({
        SRCNAME: req.body.SRCNAME,
        USERID: req.body.USERID
    })

    Income.remove(_income,(err, data) =>{
        res.send.data;
    })
    res.send("Deleted: " + _income.SRCNAME)
}
