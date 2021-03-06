const { Housing } = require("../models/housing.model");

module.exports = app => {
    const housing = require("../controllers/housing.controller");
  
    // Test Method to Grab all housing data
    app.get("/all", housing.getAll);

    //Add New housing expense
    app.post("/newHousing/:ownership&:costs&:userid", housing.create);

} ;