const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('assetmaintenance', {
    MaintenanceID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    AssetID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    MaintenanceType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Details: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ScheduledDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    MaintenanceStatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CompletedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    CostofRepairs: {
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
    tableName: 'assetmaintenance',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaintenanceID" },
        ]
      },
    ]
  });
};
