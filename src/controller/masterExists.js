const MOVEMENT_DETAIL = require('../model/inv/movementDetail.js');
const MASTER_EXISTENCE = require("../model/inv/masterExistence.js"); 
const PRODUCT = require('../model/inv/product.js');
const MOVEMENT_MASTER = require('../model/inv/movementMaster.js');
const { Op } = require("sequelize");

const calculatePricePromedio = async (productId) => {
    //{productId:"AL01"}
    //const productId = req.body.productId;

    //Obtengo todas las entradas
    const movements = await MOVEMENT_MASTER.findAll({
        where:{movementType: "E"}
    });

    const ids = movements.map(movement => movement.id);

    //obtengo la suma de todos los totales
    const sumOfPrice = await MOVEMENT_DETAIL.sum("totalAmount",{
        where:{
            movementMasterId:{
                [Op.in]:ids
            },
            productId:productId
        }
    })

     //obtengo la cantidad de producto ingresado.
    const sumOfQuantity = await MOVEMENT_DETAIL.sum("quantity",{
        where:{
            movementMasterId:{
                [Op.in]:ids
            },
            productId:productId
        }
    })

    //calcular precio promedio
    let promedio = sumOfPrice / sumOfQuantity;
    promedio = promedio.toFixed(1);

    const product = await PRODUCT.findByPk(productId);
    await product.update({
        price:promedio
    });

    await product.save();

    return product;
}

const RegisterMasterExistence = async(movementId) =>{
   
    const movement = await MOVEMENT_MASTER.findByPk(movementId,{include:[{model:MOVEMENT_DETAIL}]});

    movement.movementDetails.forEach(async detail => {
        
        const y2 = movement?.year;
        const m2 = movement?.month;
        const w2 = movement?.warehouseId;
        const p2 = detail.productId;

        const product = await PRODUCT.findByPk(detail.productId);

        let masterExists = await MASTER_EXISTENCE.findOne({
            where:{
                year: y2,
                month:m2,
                warehouseId:w2,
                productId:p2
            }
        });

        if(masterExists == undefined) {

            const master = await MASTER_EXISTENCE.create({
                year: y2,
                month:m2,
                warehouseId:w2,
                productId:p2,
                initial:0,
                entry:0, 
                exit:0, 
                residue:0,
                initialValue:0,
                entryValue:0,
                exitValue:0,
                residueValue:0
            });

            masterExists = await MASTER_EXISTENCE.findOne({
                where:{
                    year: y2,
                    month:m2,
                    warehouseId:w2,
                    productId:p2
                }
            });
        }

        let entry = masterExists.entry;
        let exit = masterExists.exit;
        let residue = masterExists.residue;
        let entryValue = parseFloat(masterExists.entryValue);
        let exitValue = parseFloat(masterExists.exitValue);
        let residueValue = parseFloat(masterExists.residueValue);

        if(movement.movementType == "E"){
            entry += detail.quantity;
            entryValue += parseFloat(detail.quantity * (product.price != 0 ? product.price : detail.price));

        }
        else if(movement.movementType == "S"){
            exit +=  detail.quantity;
            exitValue += parseFloat(detail.quantity * (product.price != 0 ? product.price : detail.price)); 
        }
        
        residue = (masterExists.initial + entry) - exit;
        residueValue = parseFloat(masterExists.initialValue + entryValue) - exitValue;  

        await masterExists.update({  
            entry, 
            exit, 
            residue,
            entryValue:entryValue.toFixed(2),
            exitValue:exitValue.toFixed(2),
            residueValue:residueValue.toFixed(2)
        });
        await masterExists.save();
    });

    return { message:"La existencia de calculo correctamente"}
    
}

const openMasterExists = async (inventory) =>{

    //obtener el inventario anterior
    let dateOld = new Date(inventory.year + "-" + inventory.month + "-01");
    dateOld.setMonth(dateOld.getMonth() - 1);
    
    // obtener productos ....
    const products = await PRODUCT.findAll({where:{active:true}});

    products.forEach(async product =>{

        //obtener el maestro de existencia anterior
        const masterExists = await MASTER_EXISTENCE.findOne({
            order:[['id','DESC']],
            where:{
                warehouseId:inventory.warehouseId,
                productId:product.id
            },
            
        });

        //calcular el inventacio inicial
        const initial = masterExists != undefined ? masterExists.residue: 0;
        const initialValue = masterExists != undefined ? masterExists.residueValue: 0;


        const newMasterExistes = await MASTER_EXISTENCE.create({
            year:inventory.year,
            month:inventory.month,
            productId:product.id,
            warehouseId:inventory.warehouseId,
            initial:initial,
            entry:0,
            exit:0,
            residue:initial,
            initialValue:initialValue,
            entryValue:0,
            exitValue:0,
            residueValue:initialValue,
            unitPrice:product.price
        }); 
    });
    

    const masterExistss = await MASTER_EXISTENCE.findOne({
        where:{
            year:inventory.year,
            month:inventory.month,
            warehouseId:inventory.warehouseId
        }
    });

    return masterExistss;
    
}

module.exports = {
    calculatePricePromedio,
    RegisterMasterExistence,
    openMasterExists
}