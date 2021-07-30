const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('auditperiodmappingother', {
    RID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    MappingID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    RightsFor: {
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
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SubCategoryID: {
      type: DataTypes.INTEGER,
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
    tableName: 'auditperiodmappingother',
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
