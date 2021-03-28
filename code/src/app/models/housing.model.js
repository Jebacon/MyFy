const sql = require("./db.js");

const Housing = function(_housing) {
  this.HOUSINGID= _housing.HOUSINGID;
  this.OWNERSHIP = _housing.OWNERSHIP;
  this.COSTS = _housing.COSTS;
  this.USERID = _housing.USERID;
  this.new_OWNERSHIP = _housing.new_OWNERSHIP;
  this.new_COSTS = _housing.new_COSTS;
};

Housing.create = (_housing, result) => {
  sql.query("INSERT INTO Housing (OWNERSHIP, COSTS, USERID) VALUES(?, ?, ?)",[_housing.OWNERSHIP, _housing.COSTS, _housing.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created housing entery: ", {..._housing });
    result(null, {..._housing });
  });
};
Housing.findByHousingId = (_housing, result) => {
  sql.query(`SELECT HOUSINGID FROM Housing WHERE HOUSINGID = ? and USERID = ?`,[_housing.HOUSINGID, _housing.USERID], (err, res) => {
    if (err) {
     
      result(err, null);
      return;
    }else {
     
      result(null, res);
      return;
    }
  });
};
Housing.updateHousing = (_housing, result) => {
  sql.query(
    "UPDATE Housing SET OWNERSHIP = ?, COSTS = ? WHERE HOUSINGID = ? and USERID = ?",
    [_housing.new_OWNERSHIP, _housing.new_COSTS,_housing.HOUSINGID, _housing.USERID],
    (err, res) => {
      if (err) {
       
        result(err, null);
        return;
      }
      
      if (res.affectedRows == 0) {        
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated housing entry with ID: " + _housing.HOUSINGID);
      result(null, {..._housing.HOUSINGID });
    }
  );
};

Housing.getAll = result => {
  sql.query("SELECT * FROM Housing", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Housing entries: ", res);
    result(null, res);
  });
};
Housing.remove = (_housing, result) => {
  sql.query("DELETE FROM Housing WHERE HOUSINGID = ?", _housing.HOUSINGID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Housing entry with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted housing entry for entry with houseid: ", _housing.HOUSINGID);
    result(null, res);
  });
};
module.exports = Housing;