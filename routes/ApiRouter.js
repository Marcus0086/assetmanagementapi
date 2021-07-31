const express = require('express');
const router = express.Router();
const ApiService = require('../services/ApiService');
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
module.exports = router;