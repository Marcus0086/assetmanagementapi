const db = require('../models/index')
module.exports = {
    CRUDDepartment: {
        getDepartment: async (req, res) => {
            const { deptid } = req.query;
            try {
                const department = deptid !== undefined ? await db.department.findAll({
                    attributes: ['DeptID', 'ClientID', 'Department', 'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn'],
                    where: { DeptID: deptid, IsActive: true, IsDeleted: false }
                }) : await db.department.findAll({
                    attributes: ['DeptID', 'ClientID', 'Department', 'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn'],
                    where: { IsActive: true, IsDeleted: false }
                });
                if (department.length > 0) {
                    res.status(200).send({ 'message': 'Success', data: department });
                } else {
                    res.status(404).send({ 'message': 'data not found' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        newDepartment: async (req, res) => {
            const { clientid, department } = req.body;
            try {
                if (clientid !== undefined && department !== undefined) {
                    const postres = await db.department.create({
                        ClientID: clientid,
                        Department: department
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
        deleteDepartment: async (req, res) => {
            const { deptid } = req.query;
            try {
                const updateRecords = await db.department.update(
                    {
                        IsDeleted: true,
                        ModifiedOn: new Date().toISOString()
                    },
                    {
                        where: { DeptID: deptid }
                    }
                );
                if (updateRecords !== null) {
                    res.status(200).send({ 'message': `Department:${deptid} deleted successfully` });
                } else {
                    res.status(400).send({ 'message': 'Error in deleting site data' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        updateDepartment: async (req, res) => {
            const { deptid } = req.query;
            const { clientid, department } = req.body;
            try {
                if (clienid !== undefined && department !== undefined) {
                    const updateRecords = await db.department.update(
                        {
                            ClientID: clientid,
                            Department: department,
                            ModifiedOn: new Date().toISOString()
                        },
                        {
                            where: { SiteID: siteid }
                        }
                    );
                    if (updateRecords !== null) {
                        res.status(200).send({ 'message': `Department:${deptid} updated successfully` });
                    } else {
                        res.status(400).send({ 'message': 'Error in updating department data' });
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