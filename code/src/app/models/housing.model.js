const sql = require("./db.js");

const Housing = function(housing) {
  this.HOUSINGID= housing.HOUSINGID;
  this.OWNERSHIP = housing.OWNERSHIP;
  this.COSTS = housing.COSTS;
  this.USERID = housing.USERID;
  this.new_OWNERSHIP = housing.new_OWNERSHIP;
  this.new_COSTS = housing.new_COSTS;
};

Housing.create = (housing, result) => {
  sql.query("INSERT INTO Housing (OWNERSHIP, COSTS, USERID) VALUES(?, ?, ?)",[housing.OWNERSHIP, housing.COSTS, housing.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created housing entery: ", {...housing });
    result(null, {...housing });
  });
};
Housing.findByHousingId = (housing, result) => {
  sql.query(`SELECT HOUSINGID FROM Housing WHERE HOUSINGID = ? and USERID = ?`,[housing.HOUSINGID, housing.USERID], (err, res) => {
    if (err) {
     
      result(err, null);
      return;
    }else {
     
      result(null, res);
      return;
    }
  });
};
Housing.updateHousing = (houing, result) => {
  sql.query(
    "UPDATE Housing SET OWNERSHIP = ?, COSTS = ? WHERE HOUSINGID = ? and USERID = ?",
    [housing.new_OWNERSHIP, housing.new_COSTS,housing.HOUSINGID, housing.USERID],
    (err, res) => {
      if (err) {
       
        result(err, null);
        return;
      }
      
      if (res.affectedRows == 0) {        
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated housing entry with ID: " + housing.HOUSINGID);
      result(null, {...housing.HOUSINGID });
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
Housing.remove = (housing, result) => {
  sql.query("DELETE FROM Housing WHERE HOUSINGID = ?", housing.HOUSINGID, (err, res) => {
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

    console.log("deleted housing entry for entry with houseid: ", housing.HOUSINGID);
    result(null, res);
  });
};
module.exports = Housing;