const sql = require("./db.js");

const Income = function(income) {
  this.id = income.id;
  this.srcName = income.srcName;
  this.amount = income.amount;
  this.paycycle = income.paycycle;
  this.userId = income.userId;
};

Income.create = (income, result) => {
  sql.query("INSERT INTO Income(SRCNAME, AMOUNT, PAYCYCLE, USERID) VALUES(?, ?, ?, ?, 0, now());",[ income.srcName, income.amount, income.paycycle, income.userId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", {...user });
    result(null, {...user });
  });
};
/*
Income.login = (income, result) => {
  sql.query('SELECT ID,EMAIL, PASSWORD, FNAME, LNAME FROM Users WHERE EMAIL = ? AND PASSWORD = ?;', [income.email, user.password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
      console.log("Login Accepted:", res);
      result(null, res);
      return;
  })
}

Income.findByEmail = (user, result) => {
  sql.query(`SELECT EMAIL FROM Users WHERE EMAIL = ?`,[user.email], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return next(err);
    }
    if (res.length == 1) {
      console.log("found user: ", res);
      result(null, res);
      return next(err);
    } else {
      result("Good to go!", null);
      return;
    }
  });
};
*/

Income.getAll = result => {
  sql.query("SELECT * FROM Income", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};
/*
Income.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
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

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Income.remove = (id, result) => {
  sql.query("DELETE FROM User WHERE id = ?", id, (err, res) => {
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

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

Income.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};
*/


module.exports = Income;