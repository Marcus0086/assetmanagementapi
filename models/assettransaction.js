const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('assettransaction', {
    TransactionID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    AssetID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    TransactionType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SiteID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    LocationID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DeptID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Notes: {
      type: DataTypes.STRING(200),
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
    tableName: 'assettransaction',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TransactionID" },
        ]
      },
    ]
  });
};
