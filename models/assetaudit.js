const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('assetaudit', {
    AuditID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    AssetID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    AuditPeriodID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AuditByUserID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AssetCondition: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    AuditStatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    OldSiteID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NewSiteID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OldLocationID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OldDeptID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NewDeptID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OldIssuedTo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    NewIssuedTo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    AuditCompletedOn: {
      type: DataTypes.DATE,
      allowNull: true
    },
    IsApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ApprovedOn: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'assetaudit',
    timestamps: false
  });
};
