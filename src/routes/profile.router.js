const { Router } = require('express');

const profile = require('../controller/profile.controller.js');
const router = Router();

router.post("/",profile.create);
router.post("/:id/permission",profile.addPermission);

module.exports = router;

