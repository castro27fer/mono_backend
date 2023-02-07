
const EXCEPTIONS = require('../exceptions.js');
const ValidateError = require('../validateError.js');

const MOVEMENT_MASTER = require('../model/inv/movementMaster.js');
const PRODUCT_TYPE = require('../model/inv/productType.js');
const BRAND = require('../model/inv/brand.js');
const WAREHOUSE = require('../model/inv/warehouse.js');
const PRODUCT = require('../model/inv/product.js');
const MOVEMENT_DETAIL = require('../model/inv/movementDetail.js');
const MASTER_EXISTENCE = require("../model/inv/masterExistence.js"); 

const createProductType = async(req,res) => {

    try{

        const dataProductType = req.body;
        const productType = await PRODUCT_TYPE.create(dataProductType);
       
        res.json(productType);

    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const createBrand = async (req, res) => {

    try{
    
        const data = req.body;
        const obj = await BRAND.create(data);
    
        res.json(obj);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const createProduct = async (req, res) => {

    try{
    
        const data = req.body;
        const obj = await PRODUCT.create(data);
    
        res.json(obj);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const createwarehouse = async (req, res) => {

    try{
    
        const data = req.body;
        const obj = await WAREHOUSE.create(data);
    
        res.json(obj);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const createMovement = async(req,res) =>{
    
    try{

        const data = req.body;
        const movementMaster = await MOVEMENT_MASTER.create(data);
       
        res.json(movementMaster);

    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const createMovementDetail = async(req,res) =>{
    
    try{

        let data = req.body;
        const movement = await MOVEMENT_DETAIL.create(data);
        res.json(movement);

    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const RegisterMasterExistence = async(req,res) =>{
    try{

        let { productId, quantity, movementType } = req.body;

        const masters = await MASTER_EXISTENCE.findAll({"where":{"productId":productId}});
        
        const master = masters.find((master2,index,masters2)=>{

            let isMayor = true;
            masters2.every((item,index)=>{
                
                isMayor = master2.year >= item.year && master2.month >= item.month
                return isMayor;
            });
            return isMayor;
        });

        
        const entry = (movementType == "E" ? master.entry + quantity : master.entry);
        const exit = (movementType == "S" ? master.exit + quantity : master.exit);
        const residue = master.initial + entry - exit;

        const saldo = master.unitPrice * quantity;

        const entryValue = (movementType == "E" ? master.entryValue + saldo : master.entryValue);
        const exitValue = (movementType == "S" ? master.exitValue + saldo : master.exitValue);
        const residueValue = master.initialValue + entryValue - exitValue;

        await master.update({
            entry: entry,
            exit: exit,
            residue:residue,
            entryValue:entryValue,
            exitValue:exitValue,
            residueValue:residueValue
        });

        await master.save();


        res.json(movement);

    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const warehouses = async(req, res) =>{
    try{
        res.json(await WAREHOUSE.findAll({"where":{"active":true}}));
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    } 
}

module.exports = {
    createProductType,
    createBrand,
    createwarehouse,
    createProduct,
    createMovement,
    createMovementDetail,
    warehouses
};