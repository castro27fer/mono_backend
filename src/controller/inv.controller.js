
const EXCEPTIONS = require('../exceptions.js');
const ValidateError = require('../validateError.js');

const MOVEMENT_MASTER = require('../model/inv/movementMaster.js');
const BRAND = require('../model/inv/brand.js');
const WAREHOUSE = require('../model/inv/warehouse.js');
const PRODUCT = require('../model/inv/product.js');
const MOVEMENT_DETAIL = require('../model/inv/movementDetail.js');
const MASTER_EXISTENCE = require("../model/inv/masterExistence.js"); 
const INVENTORY = require("../model/inv/Inventory.js");
const SUPPLIER = require("../model/inv/supplier.js");
const TYPE_PRODUCT = require("../model/inv/productType.js");
const TYPE_OF_INVENTORY = require("../model/inv/typeOfInventory.js");

// const createProductType = async(req,res) => {

//     try{

//         const dataProductType = req.body;
//         const productType = await PRODUCT_TYPE.create(dataProductType);
       
//         res.json(productType);

//     }
//     catch(exception){
//         EXCEPTIONS(exception,req,res);
//     }
// }

// const createBrand = async (req, res) => {

//     try{
    
//         const data = req.body;
//         const obj = await BRAND.create(data);
    
//         res.json(obj);
//     }
//     catch(exception){
//         EXCEPTIONS(exception,req,res);
//     }
// }

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
       
        const warehouse = await WAREHOUSE.findByPk(id);
        
        await warehouse.update({
            description: description,
            active:active
        });

        await warehouse.save();
        
        res.json(warehouse);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const movementCreate = async(req,res) =>{
    
    try{

        let data = req.body;
        console.log(data);
        const movementMaster = await MOVEMENT_MASTER.create(data);
        console.log(movementMaster);
        res.json(movementMaster);

    }
    catch(exception){
        res.status(400).json(exception);
        //EXCEPTIONS(exception,req,res);
    }
}

const createMovementDetail = async(req,res) =>{
    
    try{

        let data = req.body;
        
        data["movementMasterId"] = req.params.id;
        data["totalAmount"] = data.price * data.quantity;
    
        const movement = await MOVEMENT_DETAIL.create(data,{attributes:{include:[PRODUCT]}});
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

    // try{

        const data = req.body;
       
        const inventory = await INVENTORY.create(data);
        await inventory.save();
        //res.setHeader("Content-type", "application/json");

        res.json(inventory);

    // } catch(exception){
    //     console.log(exception);
    //     EXCEPTIONS(exception,req,res);
    // }
    

}

const Inventories = async(req,res) =>{

    try{

        const inventories = await INVENTORY.findAll({
            include:[WAREHOUSE],
            order: [
                ['closingDate', 'DESC'],
                ['openingDate','DESC']
            ],
        });
        // console.log(inventories);
        res.json(inventories);
    
    } catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const inventoryClose = async(req,res) =>{

    try{

       const id = req.params.id;
       const data = req.body;

       const inventory = await INVENTORY.findByPk(id);
       await inventory.update(data);
       await inventory.save();

       res.json(inventory);
    
    } catch(exception){
        EXCEPTIONS(exception,req,res);
    }

}

const getAllSuppliers = async(req,res) =>{
    try{

        const suppliers = await SUPPLIER.findAll();
        res.json(suppliers);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getSuppliers = async(req,res) =>{
    try{

        const suppliers = await SUPPLIER.findAll({whare:{active:true}});
        res.json(suppliers);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const supplierCreate = async(req,res) =>{

    try{

        const data = req.body;
        const supplier = await SUPPLIER.create(data);
        await supplier.save();

        res.json(supplier);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

};

const supplierEdict = async(req,res) =>{

    try{

        const id = req.params.id;
        const data = req.body;

        const supplier = await SUPPLIER.findByPk(id);
        await supplier.update(data);
        await supplier.save();

        res.json(supplier);

    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
}

const getSupplier = async (req, res) => {

    try{
        const id = req.params.id;
        const supplier = await SUPPLIER.findByPk(id);
        res.json(supplier);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
    
}

const getBrands = async (req, res) => {
    try{
        const brands = await BRAND.findAll();
        res.json(brands);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
    
}

const brandCreate = async (req, res) => {

    try{
        const data = req.body;
        const brand = await BRAND.create(data);
        await brand.save();

        res.json(brand);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

    
}

const brandUpdate = async (req, res) => {

    try{
        const id = req.params.id;
        const data = req.body;
    
        const brand = await BRAND.findByPk(id);
        await brand.update(data);
        await brand.save();
    
        res.json(brand);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

   
}

const getBrand = async (req, res) => {

    try{

        const id = req.params.id;
        const brand = await BRAND.findByPk(id);
        res.json(brand);

    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

   
}

const getTypeOfProducts = async (req, res) => {
    try{
        const typeOfProducts = await TYPE_PRODUCT.findAll();
        res.json(typeOfProducts);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
    
}

const typeProductCreate = async (req, res) => {

    try{
        const data = req.body;
        const typeProduct = await TYPE_PRODUCT.create(data);
        await typeProduct.save();

        res.json(typeProduct);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

    
}

const typeProductUpdate = async (req, res) => {

    try{
        const id = req.params.id;
        const data = req.body;
    
        const typeProduct = await TYPE_PRODUCT.findByPk(id);
        await typeProduct.update(data);
        await typeProduct.save();
    
        res.json(typeProduct);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

   
}

const getTypeProduct = async (req, res) => {

    try{

        const id = req.params.id;
        const typeProduct = await TYPE_PRODUCT.findByPk(id);
        res.json(typeProduct);

    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

   
}

const getAllProducts = async (req, res) => {
    try{
        const products = await PRODUCT.findAll({include:[TYPE_PRODUCT,BRAND]});
        console.log();
        res.json(products);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
    
}

const getProducts = async (req, res) => {
    try{
        const products = await PRODUCT.findAll({where:{active:true},include:[TYPE_PRODUCT,BRAND]});
        console.log();
        res.json(products);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
    
}

const productCreate = async (req, res) => {

    try{
        const data = req.body;
        const product = await PRODUCT.create(data);
        await product.save();

        res.json(product);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

    
}

const productUpdate = async (req, res) => {

    try{
        const id = req.params.id;
        const data = req.body;
    
        const product = await PRODUCT.findByPk(id);
        await product.update(data);
        await product.save();
    
        res.json(product);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

   
}

const getProduct = async (req, res) => {

    try{

        const id = req.params.id;
        const product = await PRODUCT.findByPk(id);
        res.json(product);

    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

   
}

const getAllTypeOfInventories= async (req, res) => {
    try{
        const typeOfInventories = await TYPE_OF_INVENTORY.findAll();
     
        res.json(typeOfInventories);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
    
}

const getTypeOfInventories = async (req, res) => {
    try{
        const typeOfInventories = await TYPE_OF_INVENTORY.findAll({where:{active:true}});
     
        res.json(typeOfInventories);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }
    
}

const typeOfInventoryCreate = async (req, res) => {

    try{
        const data = req.body;
        const typeOfInventory = await TYPE_OF_INVENTORY.create(data);
        await typeOfInventory.save();

        res.json(typeOfInventory);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

    
}

const typeOfInventoryUpdate = async (req, res) => {

    try{
        const id = req.params.id;
        const data = req.body;
    
        const typeOfInventory = await TYPE_OF_INVENTORY.findByPk(id);
        await typeOfInventory.update(data);
        await typeOfInventory.save();
    
        res.json(typeOfInventory);
    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

   
}

const getTypeOfInventory = async (req, res) => {

    try{

        const id = req.params.id;
        const typeOfInventory = await TYPE_OF_INVENTORY.findByPk(id);
        res.json(typeOfInventory);

    }
    catch(exception){
        EXCEPTIONS(exception,req,res);
    }

   
}

module.exports = {
    // createProductType,
    createwarehouse,
    createProduct,
    movementCreate,
    createMovementDetail,
    warehouses,
    createwarehouseEdict,
    getWarehouse,
    AllWarehouses,
    inventoryOpening,
    Inventories,
    inventoryClose,
    getSuppliers,
    supplierCreate,
    supplierEdict,
    getSupplier,
    getBrands,
    brandCreate,
    brandUpdate,
    getBrand,
    getTypeOfProducts,
    typeProductCreate,
    typeProductUpdate,
    getTypeProduct,
    getProducts,
    productCreate,
    productUpdate,
    getProduct,
    getTypeOfInventories,
    typeOfInventoryCreate,
    typeOfInventoryUpdate,
    getTypeOfInventory,
    getAllProducts,
    getAllSuppliers,
    getAllTypeOfInventories
};