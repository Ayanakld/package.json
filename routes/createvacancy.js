const express = require("express");
const bcrypt = require("bcryptjs");
const Basic = require("../models/basic_info");
const router = express.Router();
var path = require('path');

router
    .route("/")
    .get((req, res) => res.sendFile(path.resolve("public/html/createvacanci.html")))
    .post(async (req, res) => {
            const {country, industry, company, job, time, type, salary, image, employees} = req.body
                const response = await Basic.create({
                country, company, industry, job, time, type, salary, image, employees

        })
                    console.log("Announcement has been created" + response)

            res.sendFile(path.resolve("public/html/createvacanci.html"))
    })
module.exports = router;

