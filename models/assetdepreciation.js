const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('assetdepreciation', {
    RID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    AssetID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    DepreciationID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DepreciationRate: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    EffectiveFrom: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    EffectiveTo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    OpeningValue: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    CurrentValue: {
      type: DataTypes.FLOAT,
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
    tableName: 'assetdepreciation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RID" },
        ]
      },
    ]
  });
};
