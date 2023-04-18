
const PRIORITIES = require("../model/authorization/catAutorizacionPrioridad.js");
const STATUS = require("../model/authorization/catAutorizacionEstado.js");
const ORIGIN = require("../model/authorization/catAutorizacionOrigen.js");
const COIN = require("../model/authorization/catMoneda.js");
const DEPENDENCY = require("../model/authorization/catDependencia.js");
const CONTACT = require("../model/authorization/catContacto.js");

const EXCEPTIONS = require('../exceptions.js');

const priorityCreate = async(req,res) =>{
    try{
    
        const data = req.body;
    
        const priority = await PRIORITIES.create({
            Descripcion: data.description,
            Activo:data.active
        });
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getPriority = async(req,res) =>{
    try{

        const id = req.params.id;
        const priority = await PRIORITIES.findByPk(id,{
            attributes:[
                ['AutorizacionPrioridadId',"id"], //columnsName As columnLastName
                ["Descripcion","description"],
                ["Activo","active"]
            ]
        });
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const priorityUpdate = async(req,res) =>{
    try{

        const id = req.params.id;
        const {description,active} = req.body;
       
        const priority = await PRIORITIES.findByPk(id);
        
        await priority.update({
            Descripcion: description,
            Activo:active
        });

        await priority.save();
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getPriorities = async(req,res) =>{
    try{

        const priorities = await PRIORITIES.findAll({
            where:{"Activo":true},
            attributes:[
                ['AutorizacionPrioridadId',"id"], //columnsName As columnLastName
                ["Descripcion","description"],
                ["Activo","active"]
            ]
        });

        res.json(priorities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getAllPriorities = async(req,res) =>{
    try{

        const priorities = await PRIORITIES.findAll({
            attributes:[
                ['AutorizacionPrioridadId',"id"],
                ["Descripcion","description"],
                ["Activo","active"]
            ]
        });
        res.json(priorities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getStatusAll = async(req,res) =>{
    try{

        const priorities = await STATUS.findAll({
            attributes:[
                ['AutorizacionEstadoId',"id"],
                ["Descripcion","description"],
                ["Activo","active"]
            ]
        });
        res.json(priorities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getStatus = async(req,res) =>{
    try{

        const priorities = await STATUS.findAll({
            where:{Activo:true},
            attributes:[
                ['AutorizacionEstadoId',"id"],
                ["Descripcion","description"],
                ["Activo","active"]
            ]
        });
        res.json(priorities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getStatu= async(req,res) =>{
    try{

        const id = req.params.id;
        const priority = await STATUS.findByPk(id,{
            attributes:[
                ['AutorizacionEstadoId',"id"], //columnsName As columnLastName
                ["Descripcion","description"],
                ["Activo","active"]
            ]
        });
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const statusCreate = async(req,res) =>{
    try{
    
        const data = req.body;
    
        const priority = await STATUS.create({
            Descripcion: data.description,
            Activo:data.active
        });
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const statusUpdate = async(req,res) =>{
    try{

        const id = req.params.id;
        const {description,active} = req.body;
       
        const priority = await STATUS.findByPk(id);
        
        await priority.update({
            Descripcion: description,
            Activo:active
        });

        await priority.save();
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getOriginsAll  = async(req,res) =>{
    try{

        const priorities = await ORIGIN.findAll({
            attributes:[
                ['AutorizacionOrigenId',"id"],
                ["Descripcion","description"],
                ["Activo","active"]
            ]
        });
        res.json(priorities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getOrigin = async(req,res) =>{
    try{

        const id = req.params.id;
        const priority = await ORIGIN.findByPk(id,{
            attributes:[
                ['AutorizacionOrigenId',"id"], //columnsName As columnLastName
                ["Descripcion","description"],
                ["Activo","active"]
            ]
        });
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getOrigins = async(req,res) =>{
    try{

        const priorities = await ORIGIN.findAll({
            where:{Activo:true},
            attributes:[
                ['AutorizacionOrigenId',"id"],
                ["Descripcion","description"],
                ["Activo","active"]
            ]
        });
        res.json(priorities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const originCreate = async(req,res) =>{
    try{
    
        const data = req.body;
    
        const priority = await ORIGIN.create({
            Descripcion: data.description,
            Activo:data.active
        });
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const originUpdate = async(req,res) =>{
    try{

        const id = req.params.id;
        const {description,active} = req.body;
       
        const priority = await ORIGIN.findByPk(id);
        
        await priority.update({
            Descripcion: description,
            Activo:active
        });

        await priority.save();
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getCurrenciesAll = async(req,res) =>{
    try{

        const priorities = await COIN.findAll({
            attributes:[
                ['MonedaId',"id"],
                ["Descripcion","description"],
                ["TipoCambio","exchangeRate"],
                ["Activo","active"]
            ]
        });
        res.json(priorities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getCurrencies = async(req,res) =>{
    try{

        const priorities = await COIN.findAll({
            where:{Activo:true},
            attributes:[
                ['MonedaId',"id"],
                ["Descripcion","description"],
                ["TipoCambio","exchangeRate"],
                ["Activo","active"]
            ]
        });
        res.json(priorities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getCoin = async(req,res) =>{
    try{

        const id = req.params.id;
        const priority = await COIN.findByPk(id,{
            attributes:[
                ['MonedaId',"id"], //columnsName As columnLastName
                ["Descripcion","description"],
                ["TipoCambio","exchangeRate"],
                ["Activo","active"]
            ]
        });
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const CoinCreate = async(req,res) =>{
    try{
    
        const data = req.body;
    
        const priority = await COIN.create({
            Descripcion: data.description,
            TipoCambio: data.exchangeRate,
            Activo:data.active
        });
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const CoinUpdate  = async(req,res) =>{
    try{

        const id = req.params.id;
        const {description,exchangeRate,active} = req.body;
       
        const priority = await COIN.findByPk(id);
        
        await priority.update({
            Descripcion: description,
            TipoCambio: exchangeRate,
            Activo:active
        });

        await priority.save();
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}



const getDependenciesAll = async(req,res) =>{
    try{

        const entities = await DEPENDENCY.findAll({
            attributes:[
                ['DependenciaId',"id"],
                ["Nombre","name"],
                ["Activo","active"]
            ]
        });
        res.json(entities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getDependencies = async(req,res) =>{
    try{

        const entities = await DEPENDENCY.findAll({
            where:{Activo:true},
            attributes:[
                ['DependenciaId',"id"],
                ["Nombre","name"],
                ["Activo","active"]
            ],
            include:[{
                model:CONTACT,
                attributes:[
                    ['ContactoId',"id"],
                    ["NombreCompleto","name"],
                    ["Telefono","telephone"],
                    ["Extension","extension"],
                    ["Celular","movil"],
                    ["Correo","email"],
                    ["CorreoOpcional","emailOptional"],
                    ["Activo","active"]
                ]
            }]
        });
        res.json(entities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}


const getDependency = async(req,res) =>{
    // try{

        const id = req.params.id;
        const entity = await DEPENDENCY.findByPk(id,{
            attributes:[
                ['DependenciaId',"id"],
                ["Nombre","name"],
                ["Activo","active"]
            ],
            include:[
                { model:CONTACT,
                attributes:[
                    ["ContactoId","id"],
                    ["NombreCompleto","name"]
                ] }
            ]
        });
        


        res.json(entity);
    // }
    // catch(exception){
    //     EXCEPTIONS(exception,req,res);
    // }
}

const dependencyCreate = async(req,res) =>{
    try{
    
        const data = req.body;
    
        const dependency = await DEPENDENCY.create({
            Nombre: data.name,
            Activo:data.active
        });
        
        data.contacts.forEach(async contact => {
            let obContact = await CONTACT.findByPk(contact.id); 
            if(obContact != null){
                await obContact.update({DependenciaId: dependency.DependenciaId});
                await obContact.save();
            }
           
        });
        
        res.json(dependency);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const DependencyUpdate  = async(req,res) =>{
    try{

        const id = req.params.id;
        const {name,active} = req.body;
       
        const entity = await DEPENDENCY.findByPk(id);
        
        await entity.update({
            Nombre: name,
            Activo:active
        });

        await entity.save();
        
        res.json(entity);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}





const getContactsAll = async(req,res) =>{
    try{

        const entities = await CONTACT.findAll({
            attributes:[
                ['ContactoId',"id"],
                ["NombreCompleto","name"],
                ["Telefono","telephone"],
                ["Extension","extension"],
                ["Celular","movil"],
                ["Correo","email"],
                ["CorreoOpcional","emailOptional"],
                ["Activo","active"]
            ]
        });
        res.json(entities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getContacts = async(req,res) =>{
    try{

        const entities = await CONTACT.findAll({
            where:{Activo:true},
            attributes:[
                ['ContactoId',"id"],
                ["NombreCompleto","name"],
                ["Telefono","telephone"],
                ["Extension","extension"],
                ["Celular","movil"],
                ["Correo","email"],
                ["CorreoOpcional","emailOptional"],
                ["Activo","active"]
            ]
        });
        res.json(entities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getContact = async(req,res) =>{
    try{

        const id = req.params.id;
        const entity = await CONTACT.findByPk(id,{
            attributes:[
                ['ContactoId',"id"],
                ["NombreCompleto","name"],
                ["Telefono","telephone"],
                ["Extension","extension"],
                ["Celular","movil"],
                ["Correo","email"],
                ["CorreoOpcional","emailOptional"],
                ["Activo","active"]
            ]
        });
        
        res.json(entity);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const contactCreate = async(req,res) =>{
    // try{
    
        const data = req.body;
    
        const entity = await CONTACT.create({
            NombreCompleto: data.name,
            Telefono: data.telephone,
            Extension: data.extension,
            Celular: data.movil,
            Correo: data.email,
            CorreoOpcional: data.emailOptional,
            Activo:data.active
        });
        
        res.json(entity);
    // }
    // catch(exception){
    //     EXCEPTIONS(exception,req,res);
    // }
}

const contactUpdate  = async(req,res) =>{
    try{

        const id = req.params.id;
        const data = req.body;
       
        const entity = await CONTACT.findByPk(id);
        
        await entity.update({
            NombreCompleto: data.name,
            Telefono: data.telephone,
            Extension: data.extension,
            Celular: data.movil,
            Correo: data.email,
            CorreoOpcional: data.emailOptional,
            Activo:data.active
        });

        await entity.save();
        
        res.json(entity);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

module.exports = {
    priorityCreate,getPriority,priorityUpdate,getPriorities,getAllPriorities,
    getStatusAll,getStatu,statusCreate,statusUpdate,getStatus,getOriginsAll,
    getOrigin,getOrigins,originCreate,originUpdate,getCurrenciesAll,getCurrencies,
    getCoin,CoinCreate,CoinUpdate,
    getDependenciesAll,
    getDependencies,
    getDependency,
    dependencyCreate,
    DependencyUpdate,
    getContactsAll,
    getContacts,
    getContact,
    contactCreate,
    contactUpdate
}