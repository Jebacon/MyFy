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
exports.updateById = (req, res) =>{
    Income.updateById(req.params.SRCNAME, req.params.AMOUNT,req.params.PAYCYCLE, req.params.INCOMEID,(err,data) =>{
        if(err){
            res.send("update failed: No Income source by with that ID")
        }
        else{
            res.send("Updated")
        }
        res.send(data);
    });
};
exports.remove = (req, res) =>{
    Income.remove(req.params.INCOMEID, req.params.USERID,(err,data)=>{
        if(err){
            res.send("Remove failed: No Income source by with that ID")
        }
        else{
            res.send("Removed")
        }
        res.send(data);
    });
    //add remove all? is remove all missing * in sql code in app? 
}

