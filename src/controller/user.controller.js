
const bcrypt = require("bcryptjs");
const USER = require('../model/user.js');
const PROFILE = require("../model/profile.js");
const EXCEPTIONS = require('../exceptions.js');
const ValidateError = require('../validateError.js');
const SEQUELIZE = require('../database.js');
const { Op } = require("sequelize");

const get = async (req,res) =>{
    const { id } = req.params;
    
    const user = await USER.findByPk(id);
    res.json(user);
}

const insert = async (req,res) =>{
   
    try{
        const user = await USER.create(req.body);
        res.status(201).json(user);
    }
    catch(exceptions){
        EXCEPTIONS(exceptions,req,res);
    };    
}

const authenticate = async(req,res)=>{
    try{
        const {email,password} = req.body;
    
    const user = await USER.findOne({ "where": { "email": email } });

    if(user == null){
        throw new ValidateError("El correo ingresado no fue encontrado.");
    }

    const confirmPassword = await bcrypt.compare(password,user.password);

    if(!confirmPassword){
        throw new ValidateError("La contraseña es incorrecta.");
    }

    res.json({"message":"usuario autenticado.."});

    }
    catch(exceptions){
        EXCEPTIONS(exceptions,req,res);
    }
}

const addProfile = async(req,res) => {

    const email = req.params.email;
    const profileId = req.body.profileId;

    const user = await USER.findOne({where:{email:{[Op.eq]:email}},include:[PROFILE]});
    const profile = await PROFILE.findOne({where:{id:{[Op.eq]:profileId}}});

    try{

        if(user == null){
            throw new ValidateError("El usuario no fue encontrado.");
        }
    
        if(profile == null){
            throw new ValidateError("El cargo no fue encontrado.");
        }
        
        await user.addProfile(profile, { through: { selfGranted: false } });
       
    }
    catch(exception) {
        EXCEPTIONS(exception,req,res);
    }

    res.status(201).json();
}

const resetPassword = async (req, res) => {

    const user = await USER.findOne({where:{email:{[Op.eq]:req.params.email}}});
    try{
        if(user == null){
            throw new ValidateError("El usuario no fue encontrado.");
        }

        const { currentPassword,newPassword } = req.body;

        const confirmPassword = await bcrypt.compare(currentPassword,user.password);
        
        if(!confirmPassword){
            throw new ValidateError("La contraseña es incorrecta.");
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword,salt);
        await user.save();

        res.json(200).json();

    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

module.exports = {
    get,
    insert,
    authenticate,
    addProfile,
    resetPassword
};