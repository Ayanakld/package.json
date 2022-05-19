const express = require("express");
const router = express.Router();
var path = require('path');
const vacancyController = require("../Controllers/vacancyController")
router
    .route("/")
    .get((req, res) => res.render(path.resolve("public/html/filter.ejs")))
    .post(vacancyController.filterVac)
module.exports = router;