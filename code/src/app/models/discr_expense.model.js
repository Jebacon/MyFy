// Josiah Stadler 3/16
const sql = require("./db.js");

const  Discr_expense = function(discr_expense) {
  this.DISC_EXPID = _discr_expense.DISC_EXPID;
  this.NAME = _discr_expense.NAME;
  this.AMOUNT = _discr_expense.AMOUNT;
  this.HOW_OFTEN = _discr_expense.HOW_OFTEN;
  this.PRIORITY = _discr_expense.PRIORITY
  this.USERID = _discr_expense.USERID;
};

Discr_expense.create = (_discr_expense, result) => {
  sql.query("INSERT INTO discr_expense(NAME, AMOUNT, HOW_OFTEN, PRIOTITY, USERID) VALUES(?, ?, ?, ?);",[_discr_expense.NAME, _discr_expense.AMOUNT, _discr_expense.HOW_OFTEN, _discr_expense.PRIORITY, _discr_expense.USERID], (err, res) => {
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
  sql.query("SELECT * FROM debt WHERE USERID = ?;",[_discr_expense.USERID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User Discretionary Expenses: ", {...res });
    result(null, {...res });
  });
};
Discr_expense.updateDiscrExp = (DISC_EXPID, USERID, result) => {
  sql.query(
    "UPDATE discr_expense SET NAME = ?, AMOUNT = ?, HOW_OFTEN = ?, PRIORITY = ? WHERE DISC_EXPID = ? and USERID = ?",
    [_discr_expense.NAME, _discr_expense.AMOUNT, _discr_expense.HOW_OFTEN, _discr_expense.PRIORITY,  DISC_EXPID, USERID],
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

      console.log("updated discrectionary expense with ID: ", { DISC_EXPID: DISC_EXPID, ..._discr_expense });
      result(null, { DISC_EXPID: DISC_EXPID, ..._discr_expense });
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