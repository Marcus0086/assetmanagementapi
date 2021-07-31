const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('client', {
    ClientID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ClientName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ContactName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ContactEmail: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "ContactEmail"
    },
    ContactPhone: {
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
    tableName: 'client',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ClientID" },
          {
            name: "ContactEmail",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "ContactEmail" },
            ]
          },
        ]
      },
    ]
  });
};
