const express = require('express');
const router = express.Router();
const ApiService = require('../services/ApiService');

//CRUD APIs'
router.route('/sites').get(ApiService.CRUDSite.getSite);
router.route('/sites').post(ApiService.CRUDSite.postSite);
router.route('/sites').delete(ApiService.CRUDSite.deleteSite);
router.route('/sites').patch(ApiService.CRUDSite.updateSite);

router.route('/location').get(ApiService.CRUDLocation.getLocation);
router.route('/location').post(ApiService.CRUDLocation.newLocation);
router.route('/location').delete(ApiService.CRUDLocation.deleteLocation);
router.route('/location').patch(ApiService.CRUDLocation.updateLocation);

router.route('/department').get(ApiService.CRUDDepartment.getDepartment);
router.route('/department').post(ApiService.CRUDDepartment.newDepartment);
router.route('/department').delete(ApiService.CRUDDepartment.deleteDepartment);
router.route('/department').patch(ApiService.CRUDDepartment.updateDepartment);

router.route('/category').get(ApiService.CRUDCategory.getCategory);
router.route('/category').post(ApiService.CRUDCategory.newCategory);
router.route('/category').delete(ApiService.CRUDCategory.deleteCategory);
router.route('/category').patch(ApiService.CRUDCategory.updateCategory);

router.route('/subcategory').get(ApiService.CRUDSubCategory.getsubCategory);
router.route('/subcategory').post(ApiService.CRUDSubCategory.newsubCategory);
router.route('/subcategory').delete(ApiService.CRUDSubCategory.deletesubCategory);
router.route('/subcategory').patch(ApiService.CRUDSubCategory.updatesubCategory);

router.route('/brand').get(ApiService.CRUDBrand.getBrand);
router.route('/brand').post(ApiService.CRUDBrand.newBrand);
router.route('/brand').delete(ApiService.CRUDBrand.deleteBrand);
router.route('/brand').patch(ApiService.CRUDBrand.updateBrand);

router.route('/client').get(ApiService.CRUDClient.getClient);
router.route('/client').post(ApiService.CRUDClient.newClient);
router.route('/client').delete(ApiService.CRUDClient.deleteClient);
router.route('/client').patch(ApiService.CRUDClient.updateClient);

router.route('/user').get(ApiService.CRUDUser.getUser);
router.route('/user').post(ApiService.CRUDUser.newUser);
router.route('/user').delete(ApiService.CRUDUser.deleteUser);
router.route('/user').patch(ApiService.CRUDUser.updateUser);

//Mobile APIs'
router.route('/mobile/login').post(ApiService.LoginService.login);
router.route('/mobile/scanAsset').post(ApiService.scanAssets);
router.route('/mobile/searchAsset').get(ApiService.searchAsset);
router.route('/mobile/verifyAuditPeriod').post(ApiService.verifyAuditPeriod);

// dropdown APIs'
router.route('/dropdown/site').get(ApiService.DropDownService.listSites);
router.route('/dropdown/location').get(ApiService.DropDownService.listLocation);
router.route('/dropdown/category').get(ApiService.DropDownService.listCategory);
router.route('/dropdown/subcategory').get(ApiService.DropDownService.listSubcategory);
router.route('/dropdown/department').get(ApiService.DropDownService.listDepartment);
router.route('/dropdown/brand').get(ApiService.DropDownService.listBrand);
module.exports = router;