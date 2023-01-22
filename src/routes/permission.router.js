const { Router } = require('express');
const permission = require('../controller/permission.controller.js');
const router = Router();

router.post("/",permission.create);


module.exports = router;