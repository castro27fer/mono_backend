
const PRIORITIES = require("../model/authorization/catAutorizacionPrioridad");

const priorityCreate = async(res,req) =>{
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

const getPriority = async(res,req) =>{
    try{

        const id = req.params.id;
        const priority = await PRIORITIES.findByPk(id);
        
        res.json(priority);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const priorityUpdate = async(res,req) =>{
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

const getPriorities = async(res,req) =>{
    try{

        const priorities = await PRIORITIES.findAll({"where":{"Activo":true}});
        res.json(priorities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getAllPriorities = async(res,req) =>{
    try{

        const priorities = await PRIORITIES.findAll();
        res.json(priorities);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

module.exports = {
    priorityCreate,
    getPriority,
    priorityUpdate,
    getPriorities,
    getAllPriorities
}