const express = require("express");
var path = require("path");
const config = require('config');
const mongoose = require("mongoose");
const app = express();


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
        console.log('Server Error: ', e.message)
        process.exit(1);
    }
}
start();
