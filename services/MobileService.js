const db = require('../models/index');
const { lowerKeys } = require('./lowerKeys');
const { Op, QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../models/index');
const { loadSqlQueries } = require('../db/utils');
module.exports = {
    LoginService: {
        login: async (req, res) => {
            const { username, password } = req.body;
            try {
                if (username !== undefined && password !== undefined) {
                    const login = await db.user.findAll({
                        attributes: ['UserID', 'ClientID', 'EmpCode', 'Name', 'Role', 'Type', 'Email',
                            'AllowAppLogin', 'DeptID', 'Password', 'Mobile'],
                        where: { Email: username, IsActive: true, IsDeleted: false }
                    });
                    if (login.length > 0) {
                        const validate = await bcrypt.compare(password, login[0].Password);
                        if (validate) {
                            const { dataValues } = login[0];
                            const { Password, AllowAppLogin, Type, Role, ...rest } = dataValues;
                            if ((AllowAppLogin === true) ||
                                ((Type === 'NTPC' || Type === 'ntpc'
                                    || Type === 'Vendor' || Type === 'vendor') &&
                                    (Role === 'Employee' || Role === 'employee' ||
                                        Role === 'Auditor' || Role === 'auditor'))) {
                                const Privilege = ((Type === 'NTPC' || Type === 'ntpc') &&
                                    (Role === 'Employee' || Role === 'employee')) ? 'Employee' :
                                    ((Type === 'NTPC' || Type === 'ntpc')
                                        && (Role === 'Auditor' || Role === 'auditor')) ? 'EmployeeAuditor' :
                                        ((Type === 'Vendor') && (Role === 'Auditor' || Role === 'auditor')) ? 'Auditor' : '';
                                const data = { ...rest, Type, Role, Privilege };
                                const nData = lowerKeys(data);
                                res.status(200).send({ status: 'Success', message: 'User found', data: nData });
                            } else {
                                res.status(400).send({ status: 'Fail', message: 'User found but no login allowed' });
                            }

                        } else {
                            res.status(400).send({ status: 'Fail', message: 'Invalid Credentials', });
                        }
                    } else {
                        res.status(400).send({ status: 'Fail', message: 'User Not Found', });
                    }
                } else {
                    res.status(400).send({ 'message': 'One or more mandatory fields are empty' });
                }
            } catch (e) {
                console.log(e)
                res.status(500).send('Internal Server Error');
            }
        }
    },
    verifyAudirPeriod: async (req, res) => {

    },
    scanAssets: async (req, res) => {
        const { userid, assettag } = req.body;
        try {
            if (userid !== undefined && assettag !== undefined) {
                const user = await db.user.findAll({
                    attributes: ['UserID', 'Name'],
                    where: {
                        UserID: userid
                    }
                });
                if (user.length > 0) {
                    const sqlQuery = await loadSqlQueries('model');
                    const assets = await sequelize.query(sqlQuery.scanAsset, {
                        replacements: [assettag],
                        type: QueryTypes.SELECT
                    });
                    const nData = lowerKeys(assets);
                    if (assets.length > 0) {
                        res.status(200).send({ status: 'Success', message: 'Asset Found', data: nData });
                    } else {
                        res.status(400).send({ status: 'Fail', message: 'Asset not found', });
                    }
                } else {
                    res.status(400).send({ status: 'Fail', message: 'User Not Found', });
                }

            } else {
                res.status(400).send({ 'message': 'Please provide a valid userid and an assettag' });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    },
    searchAsset: async (req, res) => {
        const { userid, keyword } = req.query;
        try {
            const user = await db.user.findAll({ where: { UserID: userid } });
            if (user.length > 0) {
                const asset = keyword !== undefined ? await db.asset.findAll({
                    where: {
                        AssetName: {
                            [Op.like]: `%${keyword}%`
                        },

                    }
                }) : await db.asset.findAll({});
                if (asset.length > 0) {

                } else {

                }
            } else {
                res.status(400).send({ status: 'Fail', message: 'User Not Found', });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    }
}