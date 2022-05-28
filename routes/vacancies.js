const express = require("express");
const axios = require("axios")
const router = express.Router();
const path = require('path');
router

    .get("/",(req, res) =>
        axios.get("http://localhost:3001/vacancyRoute")
        .then(function(response) {
            res.render(path.resolve("public/html/announcements.ejs"), {news: response.data})
        })
        .catch (err=> {
            res.send(err)
        }))
    .post((req, res) => res.send("POST"))
module.exports = router;
