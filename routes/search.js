const express = require('express')
const vacancyController = require('../Controllers/vacancyController')
const router = express.Router();
router
    .route("/")
    .post(vacancyController.search)

module.exports = router;