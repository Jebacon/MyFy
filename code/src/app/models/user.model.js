const sql = require("./db.js");
const ErrorData = require("../logging/error.js");

const User = function(user) {
  this.fName = user.fName;
  this.lName = user.lName;
  this.email = user.email;
  this.password = user.password;
  this.newPassword = user.newPassword;
};

User.create = (user, result) => {
  sql.query("INSERT INTO Users(FNAME, LNAME, EMAIL, PASSWORD, ISADMIN, INITIALCREATION) VALUES(?, ?, ?, ?, 0, now());",[user.fName, user.lName, user.email, user.password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      error = "That email is already in use!"
      result(null, error);
      return;
    }

    console.log("created user: ", {...user });
    result(null, {...user });
  });
};

User.login = (user, result) => {
  var error = new ErrorData();
  sql.query('SELECT ID,EMAIL, PASSWORD, FNAME, LNAME FROM Users WHERE EMAIL = ? AND PASSWORD = ?;', [user.email, user.password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    /*This if checks for return data and the only thing that can happen is that there isn't a match, if there is no match, an ErrorData object is created and printed
    * to keep track of what exactly went wrong and what time the error occured. 
    */
    if (res.length == 0) {
      error.message("No user/password combination found for:\n Email: " + user.email + "\n Password: " + user.password);
      console.log(error.data());
      result(null, error.errorMsg);
      return;
    }
      console.log("Login Accepted:", res);
      result(null, res);
      return;
  });
  }

User.findByEmail = (user, result) => {
  sql.query(`SELECT EMAIL FROM Users WHERE EMAIL = ?`,[user.email], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return next(err);
    } if (res.length == 0) {
      console.log("No user found by that email.");
      result(null, "No email found!");
      return;
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

User.updatePassword = (user, result) => {
  sql.query(
    "UPDATE Users SET PASSWORD = ? WHERE EMAIL = ?", [user.newPassword, user.password, user.email],
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

      console.log("updated User: " +user.email);
      result(null, {...user.email });
    }
  );
};

User.updatefName = (user, result) => {
  sql.query(
    "UPDATE Users SET FNAME = ? WHERE EMAIL = ?", [user.fName, user.email],
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

      console.log("updated User: " +user.email);
      result(null, {...user.email });
    }
  );
};

User.updatelName = (user, result) => {
  sql.query(
    "UPDATE Users SET LNAME = ? WHERE EMAIL = ?", [user.lName, user.email],
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

      console.log("updated User: " +user.email);
      result(null, {...user.email });
    }
  );
};

User.updateName = (user, result) => {
  sql.query(
    "UPDATE Users SET FNAME = ? ,LNAME = ?  WHERE EMAIL = ?", [user.fName, user.lName, user.email],
    (err, res) => {
      if (err) {
        console.log("error: ", err.sqlMessage);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated User: "+  user.email + user.lname + user.fName);
      result(null, {...user.email });
    }
  );
};

User.remove = (user, result) => {
  sql.query("DELETE FROM Users WHERE EMAIL = ? AND PASSWORD = ?", [user.email, user.password], (err, res) => {
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