require("dotenv").config({path:"./.env"});

const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

const app = express();

app.set("port",process.env.PORT);

//Middleware
app.use(morgan("div"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res) => {
    res.json({"mono":"Bienvenido.."});
});

app.use(cors());

// var whitelist = ['http://locahost:4200']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// var corsOptions = {
//     origin: 'http://locahost:4200',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

// app.use(cors(corsOptions));
  
app.use("/api",require("./routes/router.js"));

module.exports = app;