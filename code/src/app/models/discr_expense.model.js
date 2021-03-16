// Josiah Stadler 3/16
const sql = require("./db.js");

const  Discr_expense = function(discr_expense) {
  this.NAME = discr_expense.NAME;
  this.AMOUNT = discr_expense.AMOUNT;
  this.HOW_OFTEN = discr_expense.HOW_OFTEN;
  this.PRIORITY = discr_expense.PRIORITY
  this.USERID = discr_expense.USERID;
};

Discr_expense.create = (discr_expense, result) => {
  sql.query("INSERT INTO discr_expense(NAME, AMOUNT, HOW_OFTEN, PRIOTITY, USERID) VALUES(?, ?, ?, ?);",[discr_expense.NAME, discr_expense.AMOUNT, discr_expense.HOW_OFTEN, discr_expense.PRIORITY, discr_expense.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("discretionary expense created: ", {...discr_expense });
    result(null, {...debt });
  });
};



Discr_expense.getAll = result => {
  sql.query("SELECT * FROM discr_expense", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("discrectionary expenses: ", res);
    result(null, res);
  });
};

Discr_expense.updateById = (DISC_EXPID, USERID, result) => {
  sql.query(
    "UPDATE discr_expense SET NAME = ?, AMOUNT = ?, HOW_OFTEN = ?, PRIORITY = ? WHERE DISC_EXPID = ? and USERID = ?",
    [discr_expense.NAME, discr_expense.AMOUNT, discr_expense.HOW_OFTEN, discr_expense.PRIORITY,  DEBTID, USERID],
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

      console.log("updated discrectionary expense with ID: ", { DISC_EXPID: DISC_EXPID, ...discr_expense });
      result(null, { DISC_EXPID: DISC_EXPID, ...discr_expense });
    }
  );
};

Discr_expense.remove = (DISC_EXPID, result) => {
  sql.query("DELETE FROM discr_expense WHERE DISC_EXPID = ?", DISC_EXPID, (err, res) => {
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

    console.log("deleted discrentionary expense with ID: ", DISC_EXPID);
    result(null, res);
  });
};

Discr_expense.removeAll = result => {
  sql.query("DELETE FROM discr_expense", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} discretionary expense entries`);
    result(null, res);
  });
};


module.exports = Discr_expense;