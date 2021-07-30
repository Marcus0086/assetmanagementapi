const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('complaintactivity', {
    ActivityID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    ComplaintID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    StatusUpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    StatusUpdatedOn: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'complaintactivity',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ActivityID" },
        ]
      },
    ]
  });
};
