const { Router } = require('express');
const router = Router();

router.use("/user",require("./user.router.js"));
router.use("/profile",require("./profile.router.js"));
router.use("/permission",require("./permission.router.js"));

module.exports = router;

