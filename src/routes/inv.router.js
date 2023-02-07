const { Router } = require('express');
const inv = require('../controller/inv.controller.js');
const router = Router();

router.post("/productType",inv.createProductType);
router.post("/brand",inv.createBrand);
router.post("/warehouse",inv.createwarehouse);
router.post("/product",inv.createProduct);
// router.post("/createInputMovement",inv.createInputMovement);

router.get("/warehouses",inv.warehouses);

module.exports = router;