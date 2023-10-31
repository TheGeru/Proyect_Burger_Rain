var express = require("express");
var cors = require("cors");
var rutasLogin = require("./routes/rutasLogin");
var rutasClientes = require("./routes/rutasUsuarios");
var rutasAministrador = require("./routes/rutasAdmin");
var path = require("path");

var session = require("cookie-session");
require("dotenv").config(); 
var app = express(); 


app.set("view engine", "ejs");
app.use(cors()); 
app.use(session({
  name: "session",
  keys: ["asjdwi$!23as1aoasmdlk12"],
  maxAge: 24 * 60 * 60 * 1000 
}));
app.use("/", express.static(path.join(__dirname,"/public"))) 
app.use(express.urlencoded({ extended: true })); // para recibir datos de formularios
app.use("/", rutasLogin);
app.use("/", rutasAministrador);
app.use("/", rutasClientes);


var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server in = http://localhost:${port}`);
});