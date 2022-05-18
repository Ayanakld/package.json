const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs")
const axios = require('axios')
// needed this at the level but now i dont know why
// const jwt = require('jsonwebtoken')
// const JWT_SECRET = "AUJsdfH@#$%^&sdfVCdfdfd%^&*()_FGFRsfdsdDYTf#$%^&*(sd^^fsERBVF%^&*FYVygesbfmsbdkjfsad"
var path = require('path');
router
    .route("/")
    .get((req, res) => res.sendFile(path.resolve("public/html/login.html")))
    .post(async (req, res) => {
        const {email, password} = req.body
        const user = await User.findOne({email: email}).lean()

        if (!user) {
            return res.json({status:'error', error:"Invalid email/password"})
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = {
                id: user._id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                date: user.date
            }

            // return res.json({status:'ok', data: token})
            return res.render(path.resolve('public/html/myprofile.ejs'), {users: token})
        }

        res.json({status:'error', error:"Invalid email/password2"})
    })
module.exports = router;
