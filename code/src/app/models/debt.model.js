// Josiah Stadler 3/16
const sql = require("./db.js");

const  Debt = function(debt) {
  this.DEBT_NAME = debt.DEBT_NAME;
  this.BALANCE = debt.BALANCE;
  this.RATE = debt.RATE;
  this.PAYTIME = debt.PAYTIME;
  this.USERID = debt.USERID;
};

Debt.create = (debt, result) => {
  sql.query("INSERT INTO debt(DEBT_NAME, BALANCE, RATE, PAYTIME, USERID) VALUES(?, ?, ?, ?);",[debt.DEBT_NAME,debt.BALANCE, debt.RATE, debt.PAYTIME, debt.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("debt entry created: ", {...debt });
    result(null, {...debt });
  });
};



User.getAll = result => {
  sql.query("SELECT * FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

debt.updateById = (DEBTID, USERID, result) => {
  sql.query(
    "UPDATE debt SET DEBT_NAME = ?, BALANCE = ?, RATE = ?, PAYTIME = ? WHERE DEBTID = ? and USERID = ?",
    [debt.DEBT_NAME, debt.BALANCE, debt.RATE, debt.PAYTIME, DEBTID, USERID],
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

      console.log("updated debt entry: ", { DEBTID: DEBTID, ...debt });
      result(null, { DEBTID: DEBTID, ...debt });
    }
  );
};

Debt.remove = (DEBTID, result) => {
  sql.query("DELETE FROM debt WHERE DEBTID = ?", DEBTID, (err, res) => {
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

    console.log("deleted debt entry with debtID: ", DEBTID);
    result(null, res);
  });
};

Debt.removeAll = result => {
  sql.query("DELETE FROM debt", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} debt entries`);
    result(null, res);
  });
};


module.exports = Debt;