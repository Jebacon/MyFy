// Josiah Stadler 3/16
const sql = require("./db.js");

const  Expenses = function(_expense) {
  this.NAME = _expense.NAME;
  this.COSTS = _expense.COSTS; 
  this.USERID = _expense.USERID;
  this.FREQUENCY = _expense.FREQUENCY;
};

Expenses.create = (_expense, result) => {
  sql.query("INSERT INTO Expenses(NAME, COSTS, USERID,FREQUENCY) VALUES(?, ?, ?, ?, ?);",[_expense.NAME, _expense.COSTS, _expense.USERID,_expense.FREQUENCY], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Expense created: ", {..._expense });
    result(null, {..._expense });
  });
};



Expenses.getAll = result => {
  sql.query("SELECT * FROM Expenses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("All expenses: ", res);
    result(null, res);
  });
};

Expenses.updateById = (EXPENSEID, USERID, result) => {
  sql.query(
    "UPDATE Expenses SET NAME = ?, COSTS = ? WHERE EXPENSEID = ? and USERID = ?",
    [_expense.NAME, _expense.COSTS, EXPENSEID, USERID],
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

      console.log("updated  expense with ID: ", { EXPENSEID: EXPENSEID, ..._expense });
      result(null, { EXPENSEID: EXPENSEID, ..._expense });
    }
  );
};

Expenses.remove = (EXPENSEID, result) => {
  sql.query("DELETE FROM Expenses WHERE EXPENSEID = ?", EXPENSEID, (err, res) => {
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

    console.log("deleted expense with ID: ", EXPENSEID);
    result(null, res);
  });
};

Expenses.removeAll = result => {
  sql.query("DELETE FROM Expenses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} expenses entries`);
    result(null, res);
  });
};


module.exports = Expenses;