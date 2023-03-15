
const EXCEPTIONS = require('../exceptions.js');
const ValidateError = require('../validateError.js');

const MOVEMENT_MASTER = require('../model/inv/movementMaster.js');
const PRODUCT_TYPE = require('../model/inv/productType.js');
const BRAND = require('../model/inv/brand.js');
const WAREHOUSE = require('../model/inv/warehouse.js');
const PRODUCT = require('../model/inv/product.js');
const MOVEMENT_DETAIL = require('../model/inv/movementDetail.js');
const MASTER_EXISTENCE = require("../model/inv/masterExistence.js"); 
const INVENTORY = require("../model/inv/Inventory.js");
const warehouse = require('../model/inv/warehouse.js');

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

const getWarehouse = async (req, res) => {
    const id = req.params.id;
    const warehouse = await WAREHOUSE.findByPk(id);
    res.json(warehouse);
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

const createwarehouseEdict = async(req,res) =>{

    try{

        const id = req.params.id;
        const {description,active} = req.body;
        console.log(id,active);
        const warehouse = await WAREHOUSE.findByPk(id);
        console.log(warehouse);
        await warehouse.update({
            description: description,
            active:active
        });

        await warehouse.save();
        console.log(warehouse);
        res.json(warehouse);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const createMovement = async(req,res) =>{
    
    try{

        let data = req.body;
        console.log(data);
        data["year"] = 2023;
        data["month"] = 2;
        
        const movementMaster = await MOVEMENT_MASTER.create(data);
       
        res.json(movementMaster);

    }
    catch(exception){
        res.status(400).json(exception.errors);
        //EXCEPTIONS(exception,req,res);
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
const AllWarehouses= async(req, res) =>{
    try{
        res.json(await WAREHOUSE.findAll());
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

const inventoryOpening = async(req,res) =>{

    try{

        const data = req.body;
        const inventory = await INVENTORY.create(data);
        res.json(inventory);
    

    } catch(exception){
        EXCEPTIONS(exception,req,res);
    }
    
}

const Inventories = async(req,res) =>{

    try{

        const inventories = await INVENTORY.findAll({include:[warehouse]});
        res.json(inventories);
    
    } catch(exception){
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
    warehouses,
    createwarehouseEdict,
    getWarehouse,
    AllWarehouses,
    inventoryOpening,
    Inventories
};