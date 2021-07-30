const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('assetloghistory', {
    LogID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    AssetID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    ActivityType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ActivityDetails: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ActivityDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PerformedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'assetloghistory',
    timestamps: false
  });
};
