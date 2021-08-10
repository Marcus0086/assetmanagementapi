const db = require('../models/index');
const { lowerKeys } = require('./lowerKeys');
const { sequelize } = require('../models/index');
module.exports = {
    listSites: async (req, res) => {
        const { clientid } = req.query;
        try {
            if (clientid !== undefined) {
                const sitesData = await db.Site.findAll({
                    where: {
                        ClientID: clientid,
                    },
                    attributes: ['SiteID', 'Site']
                });
                if (sitesData.length > 0) {
                    const nData = lowerKeys(sitesData);
                    res.status(200).send({ data: nData });
                } else {
                    res.status(400).send({ status: 'Fail', message: 'data not found', });
                }
            } else {
                res.status(400).send({ status: 'Fail', message: 'Please enter a client ID', });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    },
    listLocation: async (req, res) => {
        const { clientid, siteid } = req.query;
        try {
            if (clientid !== undefined && siteid !== undefined) {
                const sitesData = await db.Site.findAll({
                    where: {
                        ClientID: clientid,
                        SiteID: siteid,
                    },
                    attributes: ['SiteID']
                });
                if (sitesData.length > 0) {
                    const locationData = await db.location.findAll({
                        where: {
                            SiteID: siteid
                        },
                        attributes: ['LocationID', 'Location']
                    });
                    if (locationData.length > 0) {
                        const nData = lowerKeys(locationData);
                        res.status(200).send({ data: nData });
                    } else {
                        res.status(400).send({ status: 'Fail', message: 'data not found', });
                    }
                } else {
                    res.status(400).send({ status: 'Fail', message: 'data not found', });
                }
            } else {
                res.status(400).send({ status: 'Fail', message: 'Please enter a client ID and a site id', });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    },
    listCategory: async (req, res) => {
        const { clientid } = req.query;
        try {
            if (clientid !== undefined) {
                const CategoryData = await db.category.findAll({
                    where: {
                        ClientID: clientid
                    },
                    attributes: ['CategoryID', 'Category']
                });
                if (CategoryData.length > 0) {
                    const nData = lowerKeys(CategoryData);
                    res.status(200).send({ data: nData });
                } else {
                    res.status(400).send({ status: 'Fail', message: 'data not found', });
                }
            } else {
                res.status(400).send({ status: 'Fail', message: 'Please enter a client ID', });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    },
    listSubcategory: async (req, res) => {
        const { clientid, categoryid } = req.query;
        try {
            if (clientid !== undefined && categoryid !== undefined) {
                const CategoryData = await db.category.findAll({
                    where: {
                        ClientID: clientid,
                    },
                    attributes: ['CategoryID']
                });
                if (CategoryData.length > 0) {
                    const subCategory = await db.subcategory.findAll({
                        where: {
                            CategoryID: categoryid
                        },
                        attributes: ['SubCategoryID', 'SubCategory']
                    });
                    if (subCategory.length > 0) {
                        const nData = lowerKeys(subCategory);
                        res.status(200).send({ data: nData });
                    } else {
                        res.status(400).send({ status: 'Fail', message: 'data not found', });
                    }
                } else {
                    res.status(400).send({ status: 'Fail', message: 'data not found', });
                }
            } else {
                res.status(400).send({ status: 'Fail', message: 'Please enter a client ID and a category id', });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    },
    listDepartment: async (req, res) => {
        const { clientid } = req.query;
        try {
            if (clientid !== undefined) {
                const department = await db.department.findAll({
                    where: {
                        ClientID: clientid
                    },
                    attributes: ['DeptID', 'Department']
                });
                if (department.length > 0) {
                    const nData = lowerKeys(department);
                    res.status(200).send({ data: nData });
                } else {
                    res.status(400).send({ status: 'Fail', message: 'data not found', });
                }
            } else {
                res.status(400).send({ status: 'Fail', message: 'Please enter a client ID', });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    },
    listBrand: async (req, res) => {
        const { clientid } = req.query;
        try {
            if (clientid !== undefined) {
                const brand = await db.brand.findAll({
                    where: {
                        ClientID: clientid
                    },
                    attributes: ['BrandID', 'Brand']
                });
                if (brand.length > 0) {
                    const nData = lowerKeys(brand);
                    res.status(200).send({ data: nData });
                } else {
                    res.status(400).send({ status: 'Fail', message: 'data not found', });
                }
            } else {
                res.status(400).send({ status: 'Fail', message: 'Please enter a client ID', });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    }
}