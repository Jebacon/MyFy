const sql = require("./db.js");

const Housing = function(housing) {
  this.houseid = housing.houseid;
  this.ownership = housing.ownership;
  this.costs = housing.costs;
  this.userid = user.id;
};

Housing.create = (housing, result) => {
  sql.query("INSERT INTO Housing(OWNERSHIP, COSTS, USERID) VALUES(?, ?, now());",[housing.rents, housing.owns, housing.costs, user.id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Create housing entery: ", {...housing });
    result(null, {...housing });
  });
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




Housing.remove = (houseid, result) => {
  sql.query("DELETE FROM Housing WHERE HOUSEID = ?", houseid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted housing entry for entry with houseid: ", houseid);
    result(null, res);
  });
};




module.exports = Housing;