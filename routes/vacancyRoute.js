const express = require('express')
const vacancyController = require('../Controllers/vacancyController')
const router = express.Router();
router
    .get("/", vacancyController.find)
    .get('/:type', vacancyController.find)
module.exports = router

