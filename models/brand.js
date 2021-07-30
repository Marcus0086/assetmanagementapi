const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('brand', {
        BrandID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        ClientID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Brand: {
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
        tableName: 'brand',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "BrandID" },
                ]
            },
        ]
    });
}