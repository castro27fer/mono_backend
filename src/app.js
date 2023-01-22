require("dotenv").config({path:"./.env"});

const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("port",process.env.PORT);

//Middleware
app.use(morgan("div"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res) => {
    res.json({"mono":"Bienvenido.."});
});

app.use("/api",require("./routes/router.js"));

module.exports = app;