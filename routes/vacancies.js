const express = require("express");
const router = express.Router();
var path = require('path');
router
    .route("/")
    .get((req, res) => res.sendFile(path.resolve("public/html/announcements.html")))
    .post((req, res) => res.send("POST"))
module.exports = router;