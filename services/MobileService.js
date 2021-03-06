"use strict"
const db = require('../models/index');
const { lowerKeys } = require('./lowerKeys');
const { Op, QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../models/index');
const { loadSqlQueries } = require('../db/utils');
const date = require('date-fns');
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
    verifyAuditPeriod: async (req, res) => {
        const { userid } = req.body;
        try {
            if (userid !== undefined) {
                const auditPeriod = await db.sequelize.query('CALL verifyAuditPeriod(:userid)', {
                    replacements: { userid: userid }
                });
                if (auditPeriod.length > 0) {
                    const { PeriodFrom, PeriodTo } = auditPeriod[0];
                    const toDate = PeriodTo;
                    const fromDate = PeriodFrom;
                    const nDays = date.differenceInDays(new Date(toDate), new Date(fromDate));
                    if (nDays >= 1) res.status(200).send({ status: 'Success', message: 'Audit Period is open' });
                    else res.status(400).send({ status: 'Fail', message: 'Audit Period is closed' })
                } else {
                    res.status(400).send({ status: 'Fail', message: `data not found for userid:${userid}`, });
                }
            } else {
                res.status(400).send({ 'message': 'Please enter a user id' });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    },
    completeAudit: async (req, res) => {
        const {
            assetid, uditbyuserid, auditdate, detailsmodifed, oldsite, newsite, oldlocation,
            newlocation, olddepartment, newdepartment, oldissuedto, newissuedto
        } = req.body;
        try {
            if ([assetid, uditbyuserid, auditdate, detailsmodifed, oldsite, newsite, oldlocation,
                newlocation, olddepartment, newdepartment, oldissuedto, newissuedto].every(val => val !== undefined)) {

            } else {
                res.status(400).send({ 'message': 'One or more mandatory fields are empty' });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    },
    auditHistory: async (req, res) => {
        const { userid } = req.body;
        try {
            if (userid !== undefined) {
                const sqlQuery = await loadSqlQueries('model');
                const user = await db.user.findAll({
                    where: {
                        UserID: userid
                    },
                    attributes: ['ClientID']
                });
                if (user.length > 0) {
                    const assetAudit = await db.sequelize.query(sqlQuery.assetAudit, {
                        replacements: {
                            auid: userid
                        }
                    });
                    if (assetAudit[0].length > 0) {
                        const auditPeriod = await db.sequelize.query(sqlQuery.getAudit, {
                            replacements: {
                                apid: assetAudit?.[0]?.[0]?.AuditPeriodID
                            }
                        });
                        if (auditPeriod.length > 0) {
                            res.status(200).send({
                                'status': 'Success', message: 'Audit history found',
                                history: [
                                    {
                                        ...auditPeriod[0][0],
                                        data: [...assetAudit]
                                    }
                                ]
                            })
                        } else {
                            res.status(400).send({ 'message': 'Audit History not found' });
                        }
                    } else {
                        res.status(400).send({ 'message': 'Data not found' });
                    }
                } else {
                    res.status(400).send({ 'message': 'Data not found' });
                }
            } else {
                res.status(400).send({ 'message': 'Please enter a user id' });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
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
                const asset = await db.sequelize.query('CALL searchAsset(:keyword)', {
                    replacements: { keyword: keyword !== undefined ? keyword : null }
                });
                if (asset.length > 0) {
                    const nData = lowerKeys(asset);
                    res.status(200).send({ status: 'Success', message: 'Asset Found', data: nData });
                } else {
                    res.status(400).send({ status: 'Fail', message: 'Asset not found', });
                }
            } else {
                res.status(400).send({ status: 'Fail', message: 'User Not Found', });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    },
    addAsset: async (req, res) => {
        const {
            ClientID, AssetName, Description, AssetTag, MaterialCode, SerialNo, BrandID,
            ModelNo, PurchaseDate, PurchaseFrom, PurchaseCost, PONo, PRNo, SiteID, LocationID,
            DeptID, CategoryID, SubCategoryID, DepreciationID,
            CurrentStatus, AssetCondition
        } = req.body;
        try {
            if (Object.values(req.body).every(val => val !== undefined)) {
                const sqlQuery = await loadSqlQueries('model');
                try {
                    const assetAdd = await db.sequelize.query(sqlQuery.addAsset, {
                        replacements: {
                            ClientID: ClientID, AssetName: AssetName, Description: Description, AssetTag: AssetTag,
                            MaterialCode: MaterialCode, SerialNo: SerialNo, BrandID: BrandID,
                            ModelNo: ModelNo, PurchaseDate: PurchaseDate, PurchaseFrom: PurchaseFrom,
                            PurchaseCost: PurchaseCost, PONo: PONo, PRNo: PRNo, OwnerSiteID: SiteID,
                            OwnerLocationID: LocationID, OwnerDeptID: DeptID, CurrentSiteID: SiteID,
                            CurrentLocationID: LocationID, CategoryID: CategoryID, SubCategoryID: SubCategoryID,
                            DepreciationID: DepreciationID, CurrentStatus: CurrentStatus, AssetCondition: AssetCondition
                        }
                    });
                    res.status(400).send({ status: 'Success', message: 'Asset Successfully added' });
                } catch (err) {
                    if (err.name === 'SequelizeUniqueConstraintError')
                        res.status(400).send({ status: 'Fail', message: 'Asset already exist' });
                }

            } else {
                res.status(400).send({ 'message': 'One or more mandatory fields are empty' });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    },
    assetComplaint: async (req, res) => {
        const { assetname, category, subcategory, issues, issuesdetails,
            clientid,
            severity, altphoneno, location, time, image } = req.body;
        try {
            if ([assetname, category, subcategory, issues, issuesdetails,
                severity, altphoneno, location, clientid, time, image].every(val => val !== undefined)) {
                const sqlQuery = await loadSqlQueries('model');
                const assetAvai = await db.sequelize.query(sqlQuery.complaint, {
                    replacements: { AssetName: assetname, Category: category, SubCategory: subcategory }
                });
                if (assetAvai.length > 0) {
                    const { AssetID } = assetAvai[0][0];
                    const addComplaint = await db.sequelize.query(sqlQuery.addComplaint, {
                        replacements: {
                            AssetID: AssetID,
                            ComplaintBy: clientid,
                            ComplaintFor: AssetID,
                            ComplaintType: issues,
                            ComplaintDetails: issuesdetails,
                            CurrentStatus: severity
                        }
                    });
                    if (addComplaint) {
                        res.status(400).send({ status: 'Success', message: 'Complaint Successfully added' });
                    } else {
                        res.status(400).send({ status: 'Fail', message: 'Error in adding complaint' });
                    }
                } else {
                    res.status(400).send({ status: 'Fail', message: 'data not found' });
                }
            } else {
                res.status(400).send({ 'message': 'One or more mandatory fields are empty' });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    },
    getComplaint: async (req, res) => {
        const { complaintid } = req.query;
        try {
            if (complaintid !== undefined) {
                const complaints = await db.complaint.findAll({
                    where: {
                        ComplaintID: complaintid
                    },
                    attributes: ['ComplaintFor', 'CreatedOn', 'ComplaintType', 'CurrentStatus']
                });
                if (complaints.length > 0) {
                    const nData = lowerKeys(complaints);
                    res.status(400).send({ ...nData[0] });
                } else {
                    res.status(400).send({ status: 'Fail', message: 'data not found' });
                }
            } else {
                res.status(400).send({ 'message': 'ClientID is empty' });
            }
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal Server Error');
        }
    }
}