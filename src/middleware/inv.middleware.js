const INVENTORY = require("../model/inv/Inventory");

const valite_opening_inventory = async(req,res,next)=>{

    const { warehouseId,year,month } = req.body;
    const inventories = await INVENTORY.findAll({where:{warehouseId:warehouseId}});
    
    const inventory = inventories.find(inv => inv.closingDate == null);
    const isOpen = inventory != undefined;
    
    res.setHeader("Content-type", "application/json");
    if(isOpen) {res.status(400).json({"error":["El almacen seleccionado ya se encuentra aperturado."]}); return;}

    const duplicate = inventories.find(inv => inv.year == year && inv.month == month) != undefined;
    if(duplicate) { res.status(400).json({"error":["Ya existe un inventario con el mismo año y mes ingresados."]}); return; }

    next();
}

const valida_Open_Inventory = async(req,res,next) => {

    const { warehouseId } = req.body;

    const openInventory = await INVENTORY.findOne({where:[{warehouseId:warehouseId},{closingDate:null}]});
    if(openInventory !=undefined) next();
    else res.status(400).json({"error":["El inventario esta cerrado, debe de aperturar un nuevo inventario para continuar."]});
}

const add_data_inventory = async (req,res,next) => {

    const { warehouseId } = req.body;
    const openInventory = await INVENTORY.findOne({where:[{warehouseId:warehouseId},{closingDate:null}]});

    req.body["year"] = await openInventory.year;
    req.body["month"] = await openInventory.month;

    next();
}

module.exports = {
    valite_opening_inventory,
    valida_Open_Inventory,
    add_data_inventory
}