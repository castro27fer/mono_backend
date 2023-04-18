const AUTHORIZATION = require("../model/authorization/Autorizacion.js");
const AUTHORIZATIONDETAIL = require("../model/authorization/autorizacionDetalle.js");
const AUTHORIZATIONSTATE = require("../model/authorization/catAutorizacionEstado.js");
const AUTHORIZATIONORIGIN = require("../model/authorization/catAutorizacionOrigen.js");
const AUTHORIZATIONPRIORITY = require("../model/authorization/catAutorizacionPrioridad.js");
const AUTHORIZATIONTYPE = require("../model/authorization/catAutorizacionTipo.js");
const CONTACT = require("../model/authorization/catContacto.js");
const DEPENDENCY = require("../model/authorization/catDependencia.js");
const DEPENDENCYTYPE = require("../model/authorization/catDependenciaTipo.js");
const FORMAT = require("../model/authorization/catFormato.js");
const PRINT = require("../model/authorization/catImpresion.js");
const PRODUCT = require("../model/inv/product.js");
const PRINTIMAGEN = require("../model/authorization/catImpresionImagen.js");
const sequelize = require("../database.js");
const url = require('url');
const { QueryTypes } = require('sequelize');
const EXCEPTIONS = require('../exceptions.js');

const filterAuthorizations = async(req, res) => {

    try{
        const queryObject = url.parse(req.url, true).query;
        const parameters = JSON.parse(queryObject.parameters.replaceAll('""','null'));
        
        const authorization = await sequelize.query('SELECT * from "authorization"."filter_authorizations_by_date"(:dateType,to_date(:dateStart,\'YYYY-MM-DD\'),to_date(:dateEnd,\'YYYY-MM-DD\'),:priority,:state)',
        {
            replacements: parameters,
            type: QueryTypes.SELECT
        });
        console.log(authorization);
    
        res.json(authorization);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
   
} 

const createAuthorization = async(req, res) => {

    try{
        const data = req.body;
        const authorization = await AUTHORIZATION.create(data);
        res.json(authorization);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const updateAuthorization = async(req, res) => {

    try{
        const id = req.params.id;
        let data = req.body;
        // data["Saldo"] = data.Cantidad;

        const authorization = await AUTHORIZATION.findByPk(id);
        await authorization.update(data);
        await authorization.save();

        res.json(authorization);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getAuthorization = async (req, res) => {

    try{
        const id = req.params.id;
        const authorization = await AUTHORIZATION.findByPk(id,{include:[{model:AUTHORIZATIONDETAIL}]});
        res.json(authorization);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getAuthorizationDetails = async (req, res) => {

    try{
        const id = req.params.id;
        const details = await AUTHORIZATIONDETAIL.findAll({where:{AutorizacionId:id, Activo:true},include:[{model:PRODUCT}]});
        res.json(details);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const createAuthorizationDetail = async(req, res) => {

    let data = req.body;
    data["Saldo"] = data.Cantidad;
    data["AutorizacionId"] = req.params.id;

    const authorization = await AUTHORIZATIONDETAIL.create(data);
    res.json(authorization);
}

const updateAuthorizationDetail = async(req, res) => {

    const id = req.params.id;
    const data = req.body;
    const detail = await AUTHORIZATIONDETAIL.findByPk(id);
    await detail.update(data);
    await detail.save();

    res.json(detail);
}

const authorizationDetalRemove = async (req, res) => {

    try{

        const id = req.params.id;
        const detail = await AUTHORIZATIONDETAIL.findByPk(id);
        await detail.update({Activo:false});
        await detail.save();

        res.json(detail);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
    
}
const createAuthorizationState = async(req, res) => {

    const data = req.body;
    const authorization = await AUTHORIZATIONSTATE.create(data);
    res.json(authorization);
}

const updateAuthorizationState = async(req, res) => {

    const id = req.params.id;
    const data = req.body;

    const authorization = await AUTHORIZATIONSTATE.findByPk(id);
    await authorization.update(data);
    await authorization.save();

    res.json(authorization);
}

const createAuthorizationOrigen = async(req, res) => {

    const data = req.body;
    const authorization = await AUTHORIZATIONORIGIN.create(data);
    res.json(authorization);
}

const updateAuthorizationOrigen = async(req, res) => {

    const id = req.params.id;
    const data = req.body;

    const authorization = await AUTHORIZATIONORIGIN.findByPk(id);
    await authorization.update(data);
    await authorization.save();

    res.json(authorization);
}

const createAuthorizationPriority = async(req, res) => {

    const data = req.body;
    const authorization = await AUTHORIZATIONPRIORITY.create(data);
    res.json(authorization);
}

const updateAuthorizationPriority = async(req, res) => {

    const id = req.params.id;
    const data = req.body;

    const authorization = await AUTHORIZATIONPRIORITY.findByPk(id);
    await authorization.update(data);
    await authorization.save();

    res.json(authorization);
}

const createAuthorizationType = async(req, res) => {

    const data = req.body;
    const authorization = await AUTHORIZATIONTYPE.create(data);
    res.json(authorization);
}

const updateAuthorizationType = async(req, res) => {

    const id = req.params.id;
    const data = req.body;

    const authorization = await AUTHORIZATIONTYPE.findByPk(id);
    await authorization.update(data);
    await authorization.save();

    res.json(authorization);
}

const createContact = async(req, res) => {

    const data = req.body;
    const authorization = await CONTACT.create(data);
    res.json(authorization);
}

const updateContact = async(req, res) => {

    const id = req.params.id;
    const data = req.body;

    const authorization = await CONTACT.findByPk(id);
    await authorization.update(data);
    await authorization.save();

    res.json(authorization);
}

const createDependency = async(req, res) => {

    const data = req.body;
    const authorization = await DEPENDENCY.create(data);
    res.json(authorization);
}

const updateDependency = async(req, res) => {

    const id = req.params.id;
    const data = req.body;

    const authorization = await DEPENDENCY.findByPk(id);
    await authorization.update(data);
    await authorization.save();

    res.json(authorization);
}

const createDependencyType = async(req, res) => {

    const data = req.body;
    const authorization = await DEPENDENCYTYPE.create(data);
    res.json(authorization);
}

const updateDependencyType = async(req, res) => {

    const id = req.params.id;
    const data = req.body;

    const authorization = await DEPENDENCYTYPE.findByPk(id);
    await authorization.update(data);
    await authorization.save();

    res.json(authorization);
}

const createFormat = async(req, res) => {

    const data = req.body;
    const authorization = await FORMAT.create(data);
    res.json(authorization);
}

const updateFormat = async(req, res) => {

    const id = req.params.id;
    const data = req.body;

    const authorization = await FORMAT.findByPk(id);
    await authorization.update(data);
    await authorization.save();

    res.json(authorization);
}

const createPrint = async(req, res) => {

    const data = req.body;
    const authorization = await PRINT.create(data);
    res.json(authorization);
}

const updatePrint = async(req, res) => {

    const id = req.params.id;
    const data = req.body;

    const authorization = await PRINT.findByPk(id);
    await authorization.update(data);
    await authorization.save();

    res.json(authorization);
}

const createPrintImagen = async(req, res) => {

    const data = req.body;
    const authorization = await PRINTIMAGEN.create(data);
    res.json(authorization);
}

const updatePrintImagen = async(req, res) => {

    const id = req.params.id;
    const data = req.body;

    const authorization = await PRINTIMAGEN.findByPk(id);
    await authorization.update(data);
    await authorization.save();

    res.json(authorization);
}

module.exports ={
    createAuthorization,
    createAuthorizationDetail,
    updateAuthorization,
    updateAuthorizationDetail,
    createAuthorizationState,
    updateAuthorizationState,
    createAuthorizationOrigen,
    updateAuthorizationOrigen,
    createAuthorizationPriority,
    updateAuthorizationPriority,
    createAuthorizationType,
    updateAuthorizationType,
    createContact,
    updateContact,
    createDependency,
    updateDependency,
    createDependencyType,
    updateDependencyType,
    createFormat,
    updateFormat,
    createPrint,
    updatePrint,
    createPrintImagen,
    updatePrintImagen,
    filterAuthorizations,
    getAuthorization,
    getAuthorizationDetails,
    authorizationDetalRemove
}