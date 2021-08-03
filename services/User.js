const db = require('../models/index')
const bcrypt = require('bcrypt');
module.exports = {
    CRUDUser: {
        getUser: async (req, res) => {
            const { userid } = req.query;
            try {
                const users = userid !== undefined ? await db.user.findAll({
                    attributes: ['UserID', 'ClientID', 'EmpCode', 'Name', 'Type', 'Role', 'Email',
                        'AllowAppLogin', 'DeptID',
                        'Mobile', 'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn'],
                    where: { UserID: userid, IsActive: true, IsDeleted: false }
                }) : await db.user.findAll({
                    attributes: ['UserID', 'ClientID', 'EmpCode', 'Name', 'Type', 'Role', 'Email',
                        'AllowAppLogin', 'DeptID',
                        'Mobile', 'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn'],
                    where: { IsActive: true, IsDeleted: false }
                });
                if (users.length > 0) {
                    res.status(200).send({ 'message': 'Success', data: users });
                } else {
                    res.status(404).send({ 'message': 'data not found' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        newUser: async (req, res) => {
            const { clientid, empcode, name, type, role, email, allowapplogin, deptid, password, mobile } = req.body;
            try {
                if (clientid !== undefined && name !== undefined &&
                    empcode !== undefined && type !== undefined &&
                    role !== undefined && email !== undefined &&
                    allowapplogin !== undefined && deptid !== undefined &&
                    password !== undefined && mobile !== undefined) {
                    const hashpassword = await bcrypt.hash(password, 10);
                    const postres = await db.user.create({
                        ClientID: clientid,
                        Name: name,
                        EmpCode: empcode,
                        Type: type,
                        Role: role,
                        Email: email,
                        AllowAppLogin: allowapplogin,
                        DeptID: deptid,
                        Password: hashpassword,
                        Mobile: mobile
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
        deleteUser: async (req, res) => {
            const { userid } = req.query;
            try {
                const updateRecords = await db.user.update(
                    {
                        IsDeleted: true,
                        ModifiedOn: new Date().toISOString()
                    },
                    {
                        where: { UserID: userid }
                    }
                );
                if (updateRecords !== null) {
                    res.status(200).send({ 'message': `User:${userid} deleted successfully` });
                } else {
                    res.status(400).send({ 'message': 'Error in deleting user data' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        updateUser: async (req, res) => {
            const { userid } = req.query;
            const { clientid, empcode, name, type, role, allowapplogin, deptid, mobile } = req.body;
            try {
                if (clientid !== undefined && name !== undefined &&
                    empcode !== undefined && type !== undefined &&
                    role !== undefined && allowapplogin !== undefined &&
                    deptid !== undefined && mobile !== undefined) {
                    const updateRecords = await db.user.update(
                        {
                            ClientID: clientid,
                            Name: name,
                            EmpCode: empcode,
                            Type: type,
                            Role: role,
                            AllowAppLogin: allowapplogin,
                            DeptID: deptid,
                            Mobile: mobile

                        },
                        {
                            where: { UserID: userid }
                        }
                    );
                    if (updateRecords !== null) {
                        res.status(200).send({ 'message': `User:${userid} updated successfully` });
                    } else {
                        res.status(400).send({ 'message': 'Error in updating user data' });
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