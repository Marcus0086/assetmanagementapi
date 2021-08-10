'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('model', {
      ModelID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ModelNo: {
        type: Sequelize.INTEGER
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 1
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },
      ClientID: {
        type: Sequelize.INTEGER
      },
      Model: {
        type: Sequelize.STRING
      },
      CreatedOn: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ModifiedOn: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      tableName: 'model',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "ModelID" },
          ]
        },
      ]
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('model');
  }
};