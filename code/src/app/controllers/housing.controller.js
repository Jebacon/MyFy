const { nextTick } = require('process');
const Housing = require('../models/housing.model');

// Create and Save a new User Object into the DB.
exports.create = (req, res) => {
    const housing = new Housing({
        OWNERSHIP: req.body.OWNERSHIP,        
        COSTS: req.body.COSTS,
        USERID: req.body.USERID
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
exports.findByHousingId = (req, res) =>{
    const housing = new housing({
        HOUSINGID: req.body.HOUSINGID,
        USERID: req.body.USERID,
    });
    Housing.findByHousingId(housing, (err, data) => {
        res.send(data);
        
    })
    
};
exports.updateHousing = (req, res) => {
    const housing= new housing({
        HOUSINGID: req.body.HOUSINGID,
        USERID: req.body.USERID,
        new_OWNERSHIP:req.body.new_OWNERSHIP,           
        new_COSTS: req.body.new_COSTS,           
             
    });
    Income.findByHousingId(housing,(err, data) => {       

          Income.updateHousing(housing, (err, data) => {
              res.send(data);
          })
       
    });
}
exports.remove = (req, res) =>{
    const housing = new Housing({
        HOUSINGID: req.body.HOUSINGID,
        OWNERSHIP: req.body.OWNERSHIP,
        COSTS: req.body.COSTS,
        USERID: req.body.USERID,
    });

    Housing.remove(housing,(err, data) =>{
        res.send(data);
    })
    //res.send("Deleted: " + _income.SRCNAME)
};





