const db = require('../models/index')
module.exports = {
    CRUDCategory: {
        getCategory: async (req, res) => {
            const { categoryid } = req.query;
            try {
                const categories = categoryid !== undefined ? await db.category.findAll({
                    attributes: ['CategoryID', 'ClientID', 'Category', 'OwnerDeptID',
                        'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn'],
                    where: { CategoryID: categoryid, IsActive: true, IsDeleted: false }
                }) : await db.category.findAll({
                    attributes: ['CategoryID', 'ClientID', 'Category', 'Description', 'OwnerDeptID',
                        'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn'],
                });
                if (categories.length > 0) {
                    res.status(200).send({ 'message': 'Success', data: categories });
                } else {
                    res.status(404).send({ 'message': 'data not found' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        newCategory: async (req, res) => {
            const { clientid, category, ownerdeptid } = req.body;
            try {
                if (clientid !== undefined && category !== undefined &&
                    ownerdeptid !== undefined) {
                    const postres = await db.category.create({
                        ClientID: clientid,
                        Category: category,
                        OwnerDeptID: ownerdeptid
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
        deleteCategory: async (req, res) => {
            const { categoryid } = req.query;
            try {
                const updateRecords = await db.category.update(
                    {
                        IsDeleted: true,
                        ModifiedOn: new Date().toISOString()
                    },
                    {
                        where: { CategoryID: categoryid }
                    }
                );
                if (updateRecords !== null) {
                    res.status(200).send({ 'message': `Category:${categoryid} deleted successfully` });
                } else {
                    res.status(400).send({ 'message': 'Error in deleting category data' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        updateCategory: async (req, res) => {
            const { categoryid } = req.query;
            const { clientid, category, ownerdeptid } = req.body;
            try {
                if (clientid !== undefined && category !== undefined &&
                    ownerdeptid !== undefined) {
                    const updateRecords = await db.category.update(
                        {
                            ClientID: clientid,
                            Category: category,
                            OwnerDeptID: ownerdeptid,
                            ModifiedOn: new Date().toISOString()
                        },
                        {
                            where: { CategoryID: categoryid }
                        }
                    );
                    if (updateRecords !== null) {
                        res.status(200).send({ 'message': `Category:${categoryid} updated successfully` });
                    } else {
                        res.status(400).send({ 'message': 'Error in updating category data' });
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