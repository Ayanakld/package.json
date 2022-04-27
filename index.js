const express = require("express");
const path = require("path");
const config = require('config');
const mongoose = require("mongoose");
const passport = require("passport");
const expressSession = require("express-session");


const app = express();

const handlebars = require('express3-handlebars').create();
app.engine('handlebars', handlebars.engine)
app.set('view-engine', 'handlebars')

// @passport and express session is used to handle the authorization processes
app.use(express.urlencoded({extended:false}))
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.set("port", process.env.PORT || 3001);

app.use(express.static(__dirname + "/public"));

app.set("public", path.join(__dirname, "public"));

app.use("/", require("./routes/root"));
app.use("/vacancies", require("./routes/vacancies"));
app.use("/regis", require("./routes/registration"));
app.use("/login", require("./routes/login"));
app.use("/profile", require("./routes/profile"));

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
