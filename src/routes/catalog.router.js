const { Router } = require('express');
const catalog = require('../controller/catalog.controller.js');
const router = Router();

router.post("/priorities",catalog.priorityCreate);
router.get("/priorities/:id",catalog.getPriority);
router.put("/priorities/:id",catalog.priorityUpdate);
router.get("/prioritiesAll",catalog.getAllPriorities);
router.get("/priorities",catalog.getPriorities);

router.get("/statusAll",catalog.getStatusAll);
router.get("/status",catalog.getStatus);
router.get("/status/:id",catalog.getStatu);
router.post("/status",catalog.statusCreate);
router.put("/status/:id",catalog.statusUpdate);

router.get("/originsAll",catalog.getOriginsAll);
router.get("/origins",catalog.getOrigins);
router.get("/origins/:id",catalog.getOrigin);
router.post("/origins",catalog.originCreate);
router.put("/origins/:id",catalog.originUpdate);

router.get("/currenciesAll",catalog.getCurrenciesAll);
router.get("/currencies",catalog.getCurrencies);
router.get("/currencies/:id",catalog.getCoin);
router.post("/currencies",catalog.CoinCreate);
router.put("/currencies/:id",catalog.CoinUpdate);

router.get("/dependenciesAll",catalog.getDependenciesAll);
router.get("/dependencies",catalog.getDependencies);
router.get("/dependencies/:id",catalog.getDependency);
router.post("/dependencies",catalog.dependencyCreate);
router.put("/dependencies/:id",catalog.DependencyUpdate);

router.get("/contactsAll",catalog.getContactsAll);
router.get("/contacts",catalog.getContacts);
router.get("/contacts/:id",catalog.getContact);
router.post("/contacts",catalog.contactCreate);
router.put("/contacts/:id",catalog.contactUpdate);



module.exports = router;