module.exports = (sequelize, DataTypes) => {
    const Site = sequelize.define("Site", {
        SiteID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ClientID: {
            type: DataTypes.INTEGER
        },
        Site: {
            type: DataTypes.STRING
        },
        Description: {
            type: DataTypes.STRING
        },
        Address: {
            type: DataTypes.STRING
        },
        AptSuite: {
            type: DataTypes.STRING
        },
        City: {
            type: DataTypes.STRING
        },
        State: {
            type: DataTypes.STRING
        },
        PostalCode: {
            type: DataTypes.STRING
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        IsDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        CreatedOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        ModifiedOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },

    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    return Site;
};