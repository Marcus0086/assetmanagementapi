const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    UserID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ClientID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EmpCode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Role: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "Email"
    },
    Mobile: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    AllowAppLogin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Password: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    DeptID: {
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
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
      {
        name: "Email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Email" },
        ]
      },
    ]
  });
};
