
const PERMISSION = require("../model/permission.js");
const EXCEPTION = require("../exceptions.js");

const create = async(req,res) => {

    try{
        const permission = await PERMISSION.create(req.body);
        res.json(permission);
    }
    catch(exception){
        EXCEPTION(exception,req,res);
    }
}

module.exports = {
    create
}