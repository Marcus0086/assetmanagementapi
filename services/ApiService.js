const { CRUDSite } = require('./Site');
const { CRUDLocation } = require('./Location');
const { CRUDDepartment } = require('./Department');
const { CRUDCategory } = require('./Category');
const { CRUDSubCategory } = require('./SubCategory');
const { CRUDBrand } = require('./Brand');
const { CRUDClient } = require('./Client');
const { CRUDUser } = require('./User');
module.exports = {
    CRUDSite: CRUDSite,
    CRUDLocation: CRUDLocation,
    CRUDDepartment: CRUDDepartment,
    CRUDCategory: CRUDCategory,
    CRUDSubCategory: CRUDSubCategory,
    CRUDBrand: CRUDBrand,
    CRUDClient: CRUDClient,
    CRUDUser: CRUDUser,
}