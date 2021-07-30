const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('assetlogdetails', {
    LogDetailID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    LogID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    FieldName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    OldValue: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    NewValue: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'assetlogdetails',
    timestamps: false
  });
};
