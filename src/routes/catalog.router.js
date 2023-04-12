const { Router } = require('express');
const catalog = require('../controller/catalog.controller.js');
const router = Router();

router.post("/priorities",catalog.priorityCreate);
router.get("/priorities/:id",catalog.getPriority);
router.put("/priorities/:id",catalog.priorityUpdate);
router.get("/priorities",catalog.getPriorities);

module.exports = router;