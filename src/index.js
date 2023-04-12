require("dotenv").config({path:"./.env"});

const app = require("./app.js");
const sequelize = require("./database.js");

const port = process.env.PORT;

require("./model/authorization/Autorizacion.js");
require("./model/authorization/autorizacionDetalle.js");

async function main(){
    //try{}
    await sequelize.sync({force:false});
    app.listen(port,()=>{
        console.log("staring server " + port);
    });
}

main();