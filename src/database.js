require("dotenv").config({path:"./.env"});

const {Sequelize} = require("sequelize");

const database = process.env.DATABASE;
const user = process.env.USER_DATABASE;
const password = process.env.PASSWORD_DATABASE;
const host = process.env.HOST_DATABASE;
const port = process.env.PORT_DATABASE;


const requelize = new Sequelize(database,user,password,
    {
        host:host,dialect:"postgres",ssl:true,
        port:port
        //dialectOptions:{
            // ssl:{
            //     rejectUnauthorized:false
            // }
        //}
    });

module.exports = requelize;
