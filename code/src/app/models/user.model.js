const sql = require("./db.js");

const User = function(user) {
  this.fName = user.fName;
  this.lName = user.lName;
  this.email = user.email;
  this.password = user.password;
};

User.create = (user, result) => {
  sql.query("INSERT INTO Users(FNAME, LNAME, EMAIL, PASSWORD, ISADMIN, INITIALCREATION) VALUES(?, ?, ?, ?, 0, now());",[user.fName, user.lName, user.email, user.password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", {...user });
    result(null, {...user });
  });
};

User.login = (user, result) => {
  sql.query('SELECT EMAIL, PASSWORD FROM Users WHERE EMAIL = ? AND PASSWORD = ?;', [user.email, user.password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } if (res.length > 1) {
      console.log("Login Accepted:", res);
      result(null, res);
      return;
  }
  })
}

User.findByEmail = (user, result) => {
  sql.query(`SELECT EMAIL FROM Users WHERE EMAIL = ?`,[user.email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length == 1) {
      console.log("found user: ", res);
      result(null, res);
      return;
    } else {
      result({ kind: "Already in use:" }, null);
      return;
    }
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

User.updateById = (id, customer, result) => {
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

User.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
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

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
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


module.exports = User;