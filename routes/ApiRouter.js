const express = require('express');
const router = express.Router();
const ApiService = require('../services/ApiService');
router.route('/sites').get(ApiService.CRUDSite.getSite);
router.route('/sites').post(ApiService.CRUDSite.postSite);
router.route('/sites').delete(ApiService.CRUDSite.deleteSite);
router.route('/sites').patch(ApiService.CRUDSite.updateSite)
module.exports = router;