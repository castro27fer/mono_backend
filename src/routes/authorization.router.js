const { Router } = require('express');
const auth = require('../controller/authorization.controller.js');
const router = Router();

router.get("/filter",auth.filterAuthorizations);
router.post("/create",auth.createAuthorization);
router.put("/:id",auth.updateAuthorization);
router.get("/:id",auth.getAuthorization);
router.get("/:id/detail",auth.getAuthorizationDetails);
router.post("/:id/detail",auth.createAuthorizationDetail);
router.delete("/detail/remove/:id",auth.authorizationDetalRemove);
router.get("/:id/invoices",auth.getVoinces);
router.post("/:id/invoices",auth.voinceCreate);


module.exports = router;