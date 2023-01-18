require("dotenv").config({path:"./.env"});

const app = require("./app.js");
const sequelize = require("./database.js");

const port = process.env.PORT;

require("./model/user.js");
async function main(){
    //try{}
    await sequelize.sync({force:true});
    app.listen(port,()=>{
        console.log("staring server " + port);
    });
}

main();