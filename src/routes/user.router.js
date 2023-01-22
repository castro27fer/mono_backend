const { Router } = require('express');
const user = require('../controller/user.controller.js');
const router = Router();

router.post("/",user.insert);
router.get("/:id",user.get);
router.post("/:email/profile",user.addProfile);
router.put("/:email/resetPassword",user.resetPassword);
router.post("/authentication",user.authenticate);


module.exports = router;