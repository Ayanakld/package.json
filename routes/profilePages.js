const router = require('express').Router()
const userController = require('../Controllers/userController')
const user = require('../models/User')
var path = require('path')
router
    .route("/")
    .get("/:id", function (req, res) {
        user.findOne({
            username: req.params.username
        }, function (err, foundUser) {
            if (err) {
                req.flash("error", "Something went wrong.");
                return res.redirect("/");
            }
            if (foundUser.length == 0) //Means no data found
            {
                //Write code for when no such user is there
            }
            res.render('profile', {
                user: foundUser
            });
        })
    });
    // .post((req, res) => {res.send('POST')})
module.exports = router
