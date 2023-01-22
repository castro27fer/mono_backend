
const PROFILE = require("../model/profile.js");
const PERMISSION = require("../model/permission.js");
const EXCEPTION = require("../exceptions.js");
const ValidateError = require('../validateError.js');

const create = async(req,res)=>{

    try{
        const profile = await PROFILE.create(req.body);
        res.status(201).json({id:profile.id});
    }
    catch(exception)
    {
        EXCEPTION(exception,req,res);
    }
}

const addPermission = async(req,res)=>{

    const id = req.params.id;
    const permissionId = req.body.permissionId;

    try{

        const profile = await PROFILE.findByPk(id);
        const permission = await PERMISSION.findByPk(permissionId);

        if(profile == null){
            throw new ValidateError("No se encontro el perfil.");
        }
        if(permission == null){
            throw new ValidateError("No se encontro el permiso.")
        }

        await profile.addPermission(permission,{ through: { selfGranted: false } });

        res.status(201).json();
    }
    catch(exception){
        EXCEPTION(exception,req,res);
    }

}

module.exports = {
    create,
    addPermission
};