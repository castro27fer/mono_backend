const { Router } = require('express');
const inv = require('../controller/inv.controller.js');
const middleware = require("../middleware/inv.middleware.js");
const router = Router();

router.post("/warehouse",inv.createwarehouse);
router.get("/warehouse/:id",inv.getWarehouse);
router.post("/warehouse/edict/:id",inv.createwarehouseEdict);
router.post("/product",inv.createProduct);

router.get("/warehouses",inv.warehouses);
router.get("/AllWarehouses",inv.AllWarehouses);

router.post("/opening",[middleware.valite_opening_inventory],inv.inventoryOpening);


router.get("/Inventories",inv.Inventories);
router.post("/:id/close",inv.inventoryClose);

router.get("/suppliers",inv.getSuppliers);
router.post("/suppliers",inv.supplierCreate);
router.get("/suppliers/all",inv.getAllSuppliers);
router.get("/suppliers/:id",inv.getSupplier);
router.put("/suppliers/:id",inv.supplierEdict);

router.get("/brands",inv.getBrands);
router.post("/brands",inv.brandCreate);
router.put("/brands/:id",inv.brandUpdate);
router.get("/brands/:id",inv.getBrand);

router.get("/typeOfproducts",inv.getTypeOfProducts);
router.post("/typeOfproducts",inv.typeProductCreate);
router.put("/typeOfproducts/:id",inv.typeProductUpdate);
router.get("/typeOfproducts/:id",inv.getTypeProduct);

router.get("/products",inv.getProducts);
router.post("/products",inv.productCreate);
router.get("/products/all",inv.getAllProducts);
router.put("/products/:id",inv.productUpdate);
router.get("/products/:id",inv.getProduct);

router.get("/typeOfInventories",inv.getTypeOfInventories);
router.post("/typeOfInventories",inv.typeOfInventoryCreate);
router.get("/typeOfInventories/all",inv.getAllTypeOfInventories);
router.put("/typeOfInventories/:id",inv.typeOfInventoryUpdate);
router.get("/typeOfInventories/:id",inv.getTypeOfInventory);

router.post("/inputs",[middleware.valida_Open_Inventory,middleware.add_data_inventory],[inv.movementCreate]);

router.put("/movements",inv.getMovements)
router.get("/movements/:id",inv.getMovement);
router.put("/movements/:id",inv.updateMovement);
router.delete("/movements/:id",inv.removeMovementDetail);
router.post("/movements/:id/detail",inv.createMovementDetail);
router.put("/movements/:id/close",inv.closingMovement);
// router.post("/movements/prueba",inv.openMasterExists);
router.post("/movements/preciopromedio",inv.calculatePricePromedio);
router.get("/years",inv.getYears);
router.put("/stock",inv.getStock);
// router.get("/inputs/all",inv.getAllTypeOfInventories);
// router.put("/inputs/:id",inv.typeOfInventoryUpdate);
// router.get("/inputs/:id",inv.getTypeOfInventory);


module.exports = router;