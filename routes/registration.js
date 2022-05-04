const express = require("express");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
const router = express.Router();
var path = require('path');
const createUser = require('../Controllers/userController')
router
    .route("/")
    .get((req, res) => res.sendFile(path.resolve("public/html/registration.html")))
    .post(createUser.create)
module.exports = router;
