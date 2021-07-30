const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('asset', {
    AssetID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    ClientID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AssetName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    AssetTag: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MaterialCode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SerialNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    BrandID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ModelNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PurchaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    PurchaseFrom: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PurchaseCost: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    PONo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PRNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    OwnerSiteID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OwnerLocationID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OwnerDeptID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CurrentSiteID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CurrentLocationID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CurrentDeptID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SubCategoryID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DepreciationID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CurrentStatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    AssetCondition: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    tableName: 'asset',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AssetID" },
        ]
      },
    ]
  });
};
