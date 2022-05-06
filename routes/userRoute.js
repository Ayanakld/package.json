const express = require('express')
const userController = require('../Controllers/userController')
const router = express.Router();
router
    // .route("/")
    .get("/", userController.find)
    .get('/:id', userController.findOne)
    .patch('/:id', userController.update)
    .delete('/:id', userController.destroy);
module.exports = router

