// Josiah Stadler 3/16
const sql = require("./db.js");

const Income = function(_income) {
  this.SRCNAME =_income.SRCNAME;
  this.AMOUNT = _income.AMOUNT;
  this.PAYCYLCE = _income.PAYCYLCE;
  this.USERID = _expense.USERID;
};

Income.create = (_income, result) => {
  sql.query("INSERT INTO Income(SRCNAME, AMOUNT, PAYCYCLE, USERID) VALUES(?, ?, ?, ?);",[_income.SRCNAME, _income.AMOUNT, _income.PAYCYLCE, _income.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Income entry created: ", {..._income });
    result(null, {..._income });
  });
};



Income.getAll = result => {
  sql.query("SELECT * FROM Income", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("All Income data: ", res);
    result(null, res);
  });
};

Income.updateById = (INCOMEID, USERID, result) => {
  sql.query(
    "UPDATE Income SET SRCNAME = ?, AMOUNT = ?, PAYCYCLE = ? WHERE INCOMEID = ? and USERID = ?",
    [_income.SRCNAME, _income.AMOUNT, INCOMEID, USERID],
    (err, res) => {
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

      console.log("updated income entry with ID: ", { INCOMEID: INCOMEID, ..._income});
      result(null, { INCOMEID: INCOMEID, ..._income });
    }
  );
};

Income.remove = (INCOMEID, result) => {
  sql.query("DELETE FROM Income WHERE INCOMEID = ?", INCOMEID, (err, res) => {
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

    console.log("deleted income with ID: ", INCOMEID);
    result(null, res);
  });
};

Income.removeAll = result => {
  sql.query("DELETE FROM Income", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Income entries`);
    result(null, res);
  });
};


module.exports = Income;