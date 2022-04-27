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

        if (!name || typeof name !== 'string') {
            return res.json({
                status:'error',
                error:"Invalid username"
            })
        }
        if (!surname || typeof surname !== 'string') {
            return res.json({
                status:'error',
                error:"Invalid surname"
            })
        }
        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
            return res.json({
                status: 'error',
                error: "Invalid password"
            })
        }
        if (plainTextPassword.length < 5) {
            return res.json({
                status:'error',
                error: "Invalid password, should be at least 6 characters"
            })
        }


        const conpass = req.body.conpass
        const password = await bcrypt.hash(plainTextPassword, 11)
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
            return res.json({status: 'error'})
        }
        res.render(path.resolve("public/html/login.ejs"))
    })
module.exports = router;
