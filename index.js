const express = require("express");
const path = require("path");
const config = require('config');
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();

// const handlebars = require('express3-handlebars').create();
// app.engine('handlebars', handlebars.engine)
app.set('view-engine', 'ejs')

// @passport and express session is used to handle the authorization processes
app.use(express.urlencoded({extended:false}))
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({cookie: {maxAge: null}}))
app.use(bodyParser.json());

app.use((req, res, next)=> {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

app.set("port", process.env.PORT || 3001);

app.use(express.static(__dirname + "/public"));

app.set("public", path.join(__dirname, "public"));

app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoute"))
app.use("/vacancies", require("./routes/vacancies"));
app.use("/regis", require("./routes/registration"));
app.use("/login", require("./routes/login"));
app.use("/profile", require("./routes/profile"));
app.use("/createvacancy", require("./routes/createvacancy"));
app.use("/vacancyRoute", require("./routes/vacancyRoute"))
app.use("/messages", require("./routes/messages.js"));

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
            // Since 6th version Mongoose behaves as this attributes above are always true;
        })
        app.listen(app.get("port"),function(){
            console.log("App started on port http://localhost:" + app.get("port"));
        });

    } catch (e) {
        console.log('Server Error:  ', e.message)
        process.exit(1);
    }
}
start();
