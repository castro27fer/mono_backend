
const EXCEPTIONS = require('../exceptions.js');
const ValidateError = require('../validateError.js');

const MOVEMENT_MASTER = require('../model/inv/movementMaster.js');
const BRAND = require('../model/inv/brand.js');
const WAREHOUSE = require('../model/inv/warehouse.js');
const PRODUCT = require('../model/inv/product.js');
const MOVEMENT_DETAIL = require('../model/inv/movementDetail.js');
const INVENTORY = require("../model/inv/Inventory.js");
const SUPPLIER = require("../model/inv/supplier.js");
const TYPE_PRODUCT = require("../model/inv/productType.js");
const TYPE_OF_INVENTORY = require("../model/inv/typeOfInventory.js");

const masterExist = require("../controller/masterExists.js");
const sequelize = require("../database.js");


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

const getMovement = async (req, res) => {
    
    const id = req.params.id;
    const movement = await MOVEMENT_MASTER.findByPk(id,{
        include:[
            {
                model:MOVEMENT_DETAIL,
                include:[
                    {model:PRODUCT, as:"product"}
                ]
            }
        ]
    });
    res.json(movement);

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

const updateMovement = async (req, res) => {

    try{
        const movement = await MOVEMENT_MASTER.findByPk(req.params.id);
        await movement.update(req.body);
        await movement.save();

        res.json(movement);
    }
    catch(exception){
        res.status(400).json(exception);
    }
}

const closingMovement = async (req, res) => {

    const movement = await MOVEMENT_MASTER.findByPk(req.params.id,{
        include:[
            { model:MOVEMENT_DETAIL }
        ]
    });
    await movement.update({
        close:true
    });
    await movement.save();

    //Actualizar el maestro de existencia..
    const message = await masterExist.RegisterMasterExistence(movement.id);

    //Recalcular los procios promedio de los productos...
    movement.movementDetails.forEach(async detail => await masterExist.calculatePricePromedio(detail.productId));
    
    res.json(movement);
}

const createMovementDetail = async(req,res) =>{
    
    // try{

        let data = req.body;
        
        data["movementMasterId"] = req.params.id;
        data["totalAmount"] = data.price * data.quantity;
    
        const movement = await MOVEMENT_DETAIL.create(data);
        const m2 = await MOVEMENT_DETAIL.findByPk(movement.id,{
            include:[
                {
                    model:PRODUCT,
                    as:"product"
                }
            ]
        });

        res.json(m2);

    // }
    // catch(exception){
    //     EXCEPTIONS(exception,req,res);
    // }
}

const removeMovementDetail = async (req, res) => {

    await MOVEMENT_DETAIL.destroy({where:{id:req.params.id}});

    res.json({message:"Eliminado con exito."});
}

/*************************************************************** */
/** AQUI CALCULOS DEL INVENTARIO                                 */
/*************************************************************** */
const calculatePricePromedio = async (req,res) => {
    const product = await masterExist.calculatePricePromedio(req.body.productId);
    res.json(product);
}

const RegisterMasterExistence = async(movementId) =>{
   
    const movement = await MOVEMENT_MASTER.findByPk(movementId,{include:[{model:MOVEMENT_DETAIL}]});

    movement.movementDetails.forEach(async detail => {
        
        const y2 = movement?.year;
        const m2 = movement?.month;
        const w2 = movement?.warehouseId;
        const p2 = detail.productId;

        const masterExists = await MASTER_EXISTENCE.findOne({
            where:{
                year: y2,
                month:m2,
                warehouseId:w2,
                productId:p2
            }
        });

        let entry = masterExists.entry;
        let exit = masterExists.exit;
        let residue = masterExists.residue;
        let entryValue = masterExists.entryValue;
        let exitValue = masterExists.exitValue;
        let residueValue = masterExists.residueValue;

        if(movement.movementType == "E"){
            entry += detail.quantity;
            entryValue += (detail.quantity * masterExists.unitPrice);

        }
        else if(movement.movementType == "S"){
            exit +=  detail.quantity;
            exitValue += (detail.quantity * masterExists.unitPrice) 
        }
        
        residue = (masterExists.initial + entry) - exit;
        residueValue = (masterExists.initialValue + entryValue) - exitValue;  

        await masterExists.update({  
            entry, 
            exit, 
            residue,
            entryValue,
            exitValue,
            residueValue,
            residueValue
        });
        await masterExists.save();
    });

    return { message:"La existencia de calculo correctamente"}
    
}

const inventoryOpening = async(req,res) =>{

    try{

        const data = req.body;
        const inventory = await INVENTORY.create(data);
        await inventory.save();
        
        await masterExist.openMasterExists(inventory);
        
        res.json(inventory);

    } catch(exception){
        console.log(exception);
        EXCEPTIONS(exception,req,res);
    }
    

}

// const openMasterExists = async (inventory) =>{

//     //obtener el inventario anterior
//     let dateOld = new Date(inventory.year + "-" + inventory.month + "-01");
//     dateOld.setMonth(dateOld.getMonth() - 1);
    
//     // obtener productos ....
//     const products = await PRODUCT.findAll({where:{active:true}});

//     products.forEach(async product =>{

//         //obtener el maestro de existencia anterior
//         const masterExists = await MASTER_EXISTENCE.findOne({
//             order:[['id','DESC']],
//             where:{
//                 warehouseId:inventory.warehouseId,
//                 productId:product.id
//             },
            
//         });

//         //calcular el inventacio inicial
//         const initial = masterExists != undefined ? masterExists.residue: 0;
//         const initialValue = masterExists != undefined ? masterExists.residueValue: 0;


//         const newMasterExistes = await MASTER_EXISTENCE.create({
//             year:inventory.year,
//             month:inventory.month,
//             productId:product.id,
//             warehouseId:inventory.warehouseId,
//             initial:initial,
//             entry:0,
//             exit:0,
//             residue:initial,
//             initialValue:initialValue,
//             entryValue:0,
//             exitValue:0,
//             residueValue:initialValue,
//             unitPrice:product.price
//         }); 
//     });
    

//     const masterExistss = await MASTER_EXISTENCE.findOne({
//         where:{
//             year:inventory.year,
//             month:inventory.month,
//             warehouseId:inventory.warehouseId
//         }
//     });

//     return masterExistss;
    
// }

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

const getYears = async (req, res) =>{

    const inventoriesYears = await INVENTORY.findAll({
        attributes:[sequelize.fn('DISTINCT', sequelize.col('year')) ,"year"]
    });

    const inventoriesMonths = await INVENTORY.findAll({
        attributes:[sequelize.fn('DISTINCT', sequelize.col('month')) ,"month"],
        order:[
            ["month","ASC"]
        ]
    });

    const years = inventoriesYears.map(element =>element.year);
    const months = inventoriesMonths.map(element => element.month);

    res.json({years,months});
}

const getMovements = async (req, res) => {

    const { year, month, warehouseId, typeOfInventory, movementType,registrationNumber,close } = req.body;
    
    const [results, metadata] = await sequelize.query(`
    select "mm"."year","mm"."month","mm"."warehouseId","w"."description" as "warehouse",
        "mm"."typeOfInventoryId","ti"."description" as "typeOfInventory",
        "mm"."movementType", "mm"."registrationNumber","mm"."close",
        "mm"."createdAt","mm"."id"
    from "inv"."movementMasters" as "mm"
    inner join "inv"."warehouses" as "w" on "mm"."warehouseId" = "w"."id"
    inner join "inv"."typeOfInventories" as "ti" on "mm"."typeOfInventoryId" = "ti"."id"
    where 1 = 1
    ${ year != "" ? `and "mm"."year" = ${year}` : ""}
    ${ month != "" ? `and "mm"."month" = ${month}` : ""}
    ${ warehouseId != "" ? `and "mm"."warehouseId"='${warehouseId}'`:""}
    ${ typeOfInventory != "" ? `and "mm"."typeOfInventoryId" ='${typeOfInventory}'`:""}
    ${ movementType != "" ? `and "mm"."movementType" = '${movementType}'`:""}
    ${ registrationNumber != "" ? `and "mm"."registrationNumber" = '${registrationNumber}'`:""}
    ${ close != "" ? `and "mm"."close" = ${close}`:""}`);
   
    res.json(results);

}

const getStock = async(req,res) => {

    const { year, month, warehouseId, productId } = req.body;
    
    const [results, metadata] = await sequelize.query(`
    SELECT year, month, "me"."productId","p"."name" as "product", "me"."warehouseId", "w"."description" as "warehouse",
		initial, entry, exit, residue, "initialValue", "entryValue", "exitValue", "residueValue"
	FROM inv."masterExistences" as "me"
	inner join "inv"."products" as "p" on "me"."productId" = "p".id 
	inner join "inv"."warehouses" as "w" on "me"."warehouseId" = "w"."id"
    where 1 = 1
    ${ year != "" ? `and "me"."year" = ${year}` : ""}
    ${ month != "" ? `and "me"."month" = ${month}` : ""}
    ${ warehouseId != "" ? `and "me"."warehouseId"='${warehouseId}'`:""}
    ${ productId != "" ? `and "me"."productId" = ${productId}`:""}`);
   
    res.json(results);

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
    getAllTypeOfInventories,
    getMovement,
    removeMovementDetail,
    updateMovement,
    closingMovement,
    calculatePricePromedio,
    getYears,
    getMovements,
    getStock
};