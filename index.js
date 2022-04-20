const express = require("express");
var path = require("path");
const app = express();


app.set("port", process.env.PORT || 3001);

app.use(express.static(__dirname + "/public"));

app.set("public", path.join(__dirname, "public"));

app.use("/", require("./routes/root"));
app.use("/regis", require("./routes/registration"));
app.use("/login", require("./routes/login"));

app.listen(app.get("port"),function(){
    console.log("App started on port http://localhost:" + app.get("port"));
});
