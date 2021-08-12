const { CRUDSite } = require('./Site');
const { CRUDLocation } = require('./Location');
const { CRUDDepartment } = require('./Department');
const { CRUDCategory } = require('./Category');
const { CRUDSubCategory } = require('./SubCategory');
const { CRUDBrand } = require('./Brand');
const { CRUDClient } = require('./Client');
const { CRUDUser } = require('./User');
const { LoginService, scanAssets, searchAsset, verifyAuditPeriod, addAsset, assetComplaint } = require('./MobileService');
const DropDownService = require('./dropDown');
module.exports = {
    CRUDSite: CRUDSite,
    CRUDLocation: CRUDLocation,
    CRUDDepartment: CRUDDepartment,
    CRUDCategory: CRUDCategory,
    CRUDSubCategory: CRUDSubCategory,
    CRUDBrand: CRUDBrand,
    CRUDClient: CRUDClient,
    CRUDUser: CRUDUser,
    LoginService: LoginService,
    scanAssets: scanAssets,
    searchAsset: searchAsset,
    verifyAuditPeriod: verifyAuditPeriod,
    addAsset: addAsset,
    assetComplaint: assetComplaint,
    DropDownService: DropDownService,
}