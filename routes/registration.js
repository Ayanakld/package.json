const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();
var path = require('path');
router
    .route("/")
    .get((req, res) => res.sendFile(path.resolve("public/html/registration.html")))
    .post(async (req, res) => {
        const {name, surname, email, date, password: plainTextPassword } = req.body
        if (plainTextPassword.length < 5) {
            return res.json({
                status:'error',
                error: "Invalid password, should be at least 6 characters"
            })
        }
        const conpass = req.body.conpass
        const password = await bcrypt.hash(plainTextPassword, 10)
        if (conpass !== plainTextPassword) {
            return res.json({
                status:'error',
                error: "Passwords are not the same"
            })
        }


        try {
            const response = await User.create({
                name,
                surname,
                email,
                date,
                password
            })
            console.log("User has been created" + response)
        } catch (e) {
            if (e.code === 11000) {
                return res.json({
                    status: 'error',
                    error: "Email is already in use!"
                })
            }
            console.log(e)
            return res.json({status: 'error', error: "Something went wrong... Please try again"})
        }
        res.sendFile(path.resolve("public/html/login.html"))
        // res.json({status: 'ok'})
    })
module.exports = router;
