const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();
var path = require('path');
router
    .route("/")
    .get((req, res) => res.render(path.resolve("public/html/registration.handlebars")))
    .post(async (req, res) => {
        const {name, surname, email, date, password: plainTextPassword } = req.body

        if (!name || typeof name !== 'string') {
            return res.json({
                status:'error',
                error:"Invalid username"
            })
            // req.session.message = {
            //     type: 'danger',
            //     intro: 'Empty fields',
            //     message: 'Please fill the username field.'
            // }
        }
        if (!surname || typeof surname !== 'string') {
            return res.json({
                status:'error',
                error:"Invalid surname"
            })
            // req.session.message = {
            //     type: 'danger',
            //     intro: 'Empty fields',
            //     message: 'Please fill the surname field.'
            // }
        }
        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
            return res.json({
                status: 'error',
                error: "Invalid password"
            })
            // req.session.message = {
            //     type: 'danger',
            //     intro: 'Empty fields',
            //     message: 'Please fill the password field.'
            // }
        }
        if (plainTextPassword.length < 5) {
            return res.json({
                status:'error',
                error: "Invalid password, should be at least 6 characters"
            })
            // req.session.message = {
            //     type: 'danger',
            //     intro: 'Not proper password',
            //     message: 'Your password must contain at least 6 characters.'
            // }
        }


        const conpass = req.body.conpass
        const password = await bcrypt.hash(plainTextPassword, 11)
        if (conpass !== plainTextPassword) {
            return res.json({
                status:'error',
                error: "Passwords are not the same"
            })
            // req.session.message = {
            //     type: 'danger',
            //     intro: 'Not proper password',
            //     message: 'Your passwords must be the same'
            // }
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
