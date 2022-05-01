const express = require("express");
const bcrypt = require("bcryptjs");
const Basic = require("../models/basic_info");
const router = express.Router();
var path = require('path');

router
    .route("/")
    .get((req, res) => res.sendFile(path.resolve("public/html/createvacanci.html")))
    .post(async (req, res) => {
            const {country, industry, job, time, type, salary} = req.body
                const response = await Basic.create({
                country, industry, job, time, type, salary

        })
                    console.log("User has been created" + response)

            res.render(path.resolve("public/html/createvacanci.ejs"))
    })
module.exports = router;

