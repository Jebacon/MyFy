// Josiah Stadler 3/16
const sql = require("./db.js");

const  Discr_expense = function(_discr_expense) {
  this.DISC_EXPID = _discr_expense.DISC_EXPID;
  this.NAME = _discr_expense.NAME;
  this.AMOUNT = _discr_expense.AMOUNT;
  this.HOW_OFTEN = _discr_expense.HOW_OFTEN;
  this.PRIORITY = _discr_expense.PRIORITY
  this.USERID = _discr_expense.USERID;
};

Discr_expense.create = (_discr_expense, result) => {
  sql.query("INSERT INTO discr_expense(NAME, AMOUNT, HOW_OFTEN, PRIORITY, USERID) VALUES(?, ?, ?, ?, ?);",[_discr_expense.NAME, _discr_expense.AMOUNT, _discr_expense.HOW_OFTEN, _discr_expense.PRIORITY, _discr_expense.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("discretionary expense created: ", {..._discr_expense });
    result(null, {..._discr_expense });
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
Discr_expense.getUserDiscr_expense = (_discr_expense, result) => {
  sql.query("SELECT * FROM discr_expense WHERE USERID = ?;",[_discr_expense.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User Discretionary Expenses: ", {...res });
    result(null, {...res });
  });
};
Discr_expense.updateDiscrExp = (_discr_expense, result) => {
  sql.query(
    "UPDATE discr_expense SET NAME = ?, AMOUNT = ?, HOW_OFTEN = ?, PRIORITY = ? WHERE DISC_EXPID = ? and USERID = ?",
    [_discr_expense.NAME, _discr_expense.AMOUNT, _discr_expense.HOW_OFTEN, _discr_expense.PRIORITY,  _discr_expense.DISC_EXPID, _discr_expense.USERID],
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

      console.log("updated discrectionary expense with ID: " + _discr_expense.DISC_EXPID);
      result(null,res);
    }
  );
};
Discr_expense.findByDiscrExpId = (_discr_expense, result) => {
  sql.query("SELECT * FROM discr_expense WHERE DISC_EXPID = ?" , [_discr_expense.DISC_EXPID], (err, res) => {
    if (err) {
      console.log("Sql Error!");
      result(null, err);
      return;
    } if (res.length == 0) {
      console.log("No Discretionary Expense found by the ID: " + _discr_expense.DISC_EXPID);
      result(err);
      return;
    }
    console.log("Discretionary Expense ID found for:" + _discr_expense.DISC_EXPID)
    result(null, res);
  });
};
Discr_expense.remove = (_discr_expense, result) => {
  sql.query("DELETE FROM discr_expense WHERE DISC_EXPID = ?",_discr_expense.DISC_EXPID, (err, res) => {
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

    console.log("deleted discrentionary expense with ID: ",  _discr_expense.DISC_EXPID);
    result(null, res);
  });
};

Discr_expense.removeAll = (_discr_expense, result) => {
  sql.query("DELETE FROM discr_expense WHERE USERID = ?", [_discr_expense.USERID], (err, res) =>{
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }

      if (res.affectedRow == 0) {
          result("Not Found:" + null);
          return;
      }

      console.log("Deleted ALL Discretionary Expenses for user with ID: ", _discr_expense.USERID);
      result(null, res);
  });
};



module.exports = Discr_expense;