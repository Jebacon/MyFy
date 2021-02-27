var config = require('./dbconfig');
const sql = require('mssql');

async function login() {
    try {
        let pool = await sql.connect(config);
        let login = await pool.request().query("SELECT * FROM Users");
        return login.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function addUser(User) {
    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
            .input('FirstName', sql.NVarChar, User.fName)
            .input('LastName', sql.NVarChar, User.lName)
            .input('Email', sql.Int, User.Email)
            .input('Password', sql.NVarChar, User.Password)
            .execute('InsertUser');
        return insertUser.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = {
    login: login,
    addUser: addUser
}