module.exports = app => {
    const user = require("../controllers/user.controller");
  
    // Create a new Tutorial
    app.get("/all", user.getAll);
  };