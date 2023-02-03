
const EXCEPTIONS = require('../exceptions.js');
const ValidateError = require('../validateError.js');

const MOVEMENT_MASTER = require('../model/inv/movementMaster.js');
const PRODUCT_TYPE = require('../model/inv/productType.js');
const BRAND = require('../model/inv/brand.js');
const WAREHOUSE = require('../model/inv/warehouse.js');
const PRODUCT = require('../model/inv/product.js');

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

const createInputMovement = async(req,res) =>{
    
    try{

        const data = req.body;
        const movementMaster = await MOVEMENT_MASTER.create(datamovement);
       
        res.json(movementMaster);

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
    createInputMovement
};