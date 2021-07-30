var DataTypes = require("sequelize").DataTypes;
var _asset = require("./asset");
var _assetattachment = require("./assetattachment");
var _assetaudit = require("./assetaudit");
var _assetdepreciation = require("./assetdepreciation");
var _assetlogdetails = require("./assetlogdetails");
var _assetloghistory = require("./assetloghistory");
var _assetmaintenance = require("./assetmaintenance");
var _assetphoto = require("./assetphoto");
var _assettransaction = require("./assettransaction");
var _assetwarranty = require("./assetwarranty");
var _auditperiod = require("./auditperiod");
var _auditperiodmapping = require("./auditperiodmapping");
var _auditperiodmappingother = require("./auditperiodmappingother");
var _category = require("./category");
var _client = require("./client");
var _complaint = require("./complaint");
var _complaintactivity = require("./complaintactivity");
var _department = require("./department");
var _depreciation = require("./depreciation");
var _location = require("./location");
var _subcategory = require("./subcategory");
var _user = require("./user");

function initModels(sequelize) {
  var asset = _asset(sequelize, DataTypes);
  var assetattachment = _assetattachment(sequelize, DataTypes);
  var assetaudit = _assetaudit(sequelize, DataTypes);
  var assetdepreciation = _assetdepreciation(sequelize, DataTypes);
  var assetlogdetails = _assetlogdetails(sequelize, DataTypes);
  var assetloghistory = _assetloghistory(sequelize, DataTypes);
  var assetmaintenance = _assetmaintenance(sequelize, DataTypes);
  var assetphoto = _assetphoto(sequelize, DataTypes);
  var assettransaction = _assettransaction(sequelize, DataTypes);
  var assetwarranty = _assetwarranty(sequelize, DataTypes);
  var auditperiod = _auditperiod(sequelize, DataTypes);
  var auditperiodmapping = _auditperiodmapping(sequelize, DataTypes);
  var auditperiodmappingother = _auditperiodmappingother(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var complaint = _complaint(sequelize, DataTypes);
  var complaintactivity = _complaintactivity(sequelize, DataTypes);
  var department = _department(sequelize, DataTypes);
  var depreciation = _depreciation(sequelize, DataTypes);
  var location = _location(sequelize, DataTypes);
  var subcategory = _subcategory(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    asset,
    assetattachment,
    assetaudit,
    assetdepreciation,
    assetlogdetails,
    assetloghistory,
    assetmaintenance,
    assetphoto,
    assettransaction,
    assetwarranty,
    auditperiod,
    auditperiodmapping,
    auditperiodmappingother,
    category,
    client,
    complaint,
    complaintactivity,
    department,
    depreciation,
    location,
    subcategory,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
