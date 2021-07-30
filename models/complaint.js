const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('complaint', {
    ComplaintID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    AssetID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    ComplaintBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ComplaintFor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ComplaintDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ComplaintType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ComplaintDetails: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    CurrentStatus: {
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
    tableName: 'complaint',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ComplaintID" },
        ]
      },
    ]
  });
};
