const { Router } = require('express');
const inv = require('../controller/inv.controller.js');
const router = Router();

router.post("/productType",inv.createProductType);
router.post("/brand",inv.createBrand);
router.post("/warehouse",inv.createwarehouse);
router.get("/warehouse/:id",inv.getWarehouse);
router.post("/warehouse/edict/:id",inv.createwarehouseEdict);
router.post("/product",inv.createProduct);
router.post("/createMovement",inv.createMovement);

router.get("/warehouses",inv.warehouses);
router.get("/AllWarehouses",inv.AllWarehouses);

router.post("/opening",inv.inventoryOpening);

router.get("/Inventories",inv.Inventories);

module.exports = router;