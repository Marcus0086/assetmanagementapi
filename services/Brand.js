const db = require('../models/index')
module.exports = {
    CRUDBrand: {
        getBrand: async (req, res) => {
            const { brandid } = req.query;
            try {
                const brand = brandid !== undefined ? await db.brand.findAll({
                    attributes: ['BrandID', 'ClientID', 'Brand', 'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn'],
                    where: { BrandID: brandid, IsActive: true, IsDeleted: false }
                }) : await db.brand.findAll({
                    attributes: ['BrandID', 'ClientID', 'Brand', 'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn'],
                    where: { IsActive: true, IsDeleted: false }
                });
                if (brand.length > 0) {
                    res.status(200).send({ 'message': 'Success', data: brand });
                } else {
                    res.status(404).send({ 'message': 'data not found' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        newBrand: async (req, res) => {
            const { clientid, brand } = req.body;
            try {
                if (clientid !== undefined && brand !== undefined) {
                    const postres = await db.brand.create({
                        ClientID: clientid,
                        Brand: brand
                    });
                    if (postres._options.isNewRecord) {
                        res.status(200).send({ 'message': 'Success data inserted successfully', });
                    } else {
                        res.status(400).send({ 'message': 'Error in inserting data' });
                    }
                } else {
                    res.status(400).send({ 'message': 'One or more mandatory fields are empty' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        deleteBrand: async (req, res) => {
            const { brandid } = req.query;
            try {
                const updateRecords = await db.brand.update(
                    {
                        IsDeleted: true,
                        ModifiedOn: new Date().toISOString()
                    },
                    {
                        where: { BrandID: brandid },
                    }
                );
                if (updateRecords !== null) {
                    res.status(200).send({ 'message': `Brand:${brandid} deleted successfully` });
                } else {
                    res.status(400).send({ 'message': 'Error in deleting brand data' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        updateBrand: async (req, res) => {
            const { brandid } = req.query;
            const { clientid, brand } = req.body;
            try {
                if (clientid !== undefined && brand !== undefined) {
                    const updateRecords = await db.brand.update(
                        {
                            ClientID: clientid,
                            Brand: brand,
                            ModifiedOn: new Date().toISOString()
                        },
                        {
                            where: { BrandID: brandid }
                        }
                    );
                    if (updateRecords !== null) {
                        res.status(200).send({ 'message': `Brand:${brandid} updated successfully` });
                    } else {
                        res.status(400).send({ 'message': 'Error in updating brand data' });
                    }
                } else {
                    res.status(400).send({ 'message': 'One or more mandatory fields are empty' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        }
    }
}