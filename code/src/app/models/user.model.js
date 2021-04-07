const sql = require("./db.js");

const User = function(user) {
  this.fName = user.fName;
  this.lName = user.lName;
  this.email = user.email;
  this.password = user.password;
  this.newEmail = user.newEmail;
  this.newPassword = user.newPassword;
};

User.create = (user, result) => {
  sql.query("INSERT INTO Users(FNAME, LNAME, EMAIL, PASSWORD, ISADMIN, INITIALCREATION) VALUES(?, ?, ?, ?, 0, now());",[user.fName, user.lName, user.email, user.password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, err);
      return;
    }

    console.log("created user: ", {...user });
    result({...user, 'sqlMessage':"success" }, {...user, 'sqlMessage':"success" });
  });
};

User.login = (user, result) => {
  sql.query('SELECT ID,EMAIL, PASSWORD, FNAME, LNAME FROM Users WHERE EMAIL = ? AND PASSWORD = ?;', [user.email, user.password], (err, res) => {
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

User.findByEmail = (user, result) => {
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

User.updateName = (user, result) => {
  sql.query(
    "UPDATE Users SET FNAME = ? ,LNAME = ?  WHERE EMAIL = ?", [user.fName, user.lName, user.email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, err);
        return err;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated User: "+  user.email + user.lName + user.fName);
      result({...user.email }, {...user.email });
    }
  );
};

User.updateEmail = (user, result) => {
  sql.query(
    "UPDATE Users SET EMAIL = ? WHERE EMAIL = ?", [user.newEmail, user.email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return err;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated User: " + user.email +" to "+ user.newEmail);
      result("cockandballtorture", {...user.email });
    }
  );
};

User.updatePassword = (user, result) => {
  sql.query(
    "UPDATE Users SET PASSWORD = ? WHERE EMAIL = ?", [user.newPassword, user.email],
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

      console.log("updated User: " +user.email + "'s password");
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
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted User: ", user.email);
    result(null, res);
  });
};

module.exports = User;