const { Router } = require('express');
const v = require('../controller/invoinces.controller.js');
const router = Router();

// router.get("/filter",auth.filterAuthorizations);
// router.post("/create",auth.createAuthorization);
// router.put("/:id",auth.updateAuthorization);
router.get("/:id",v.getInvoinceById);
// router.get("/:id/detail",auth.getAuthorizationDetails);
// router.post("/:id/detail",auth.createAuthorizationDetail);
// router.delete("/detail/remove/:id",auth.authorizationDetalRemove);
router.get("/:id/authorize",v.authorizeVoice);
router.delete("/:id/remove",v.removeInvoice);
router.delete("/:id/deliver",v.deliverInvoice);

// router.post("/:id/invoices",auth.voinceCreate);


module.exports = router;