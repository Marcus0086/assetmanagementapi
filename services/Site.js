const db = require('../models/index')
module.exports = {
    CRUDSite: {
        getSite: async (req, res) => {
            const { siteid } = req.query;
            try {
                const sites = siteid !== undefined ? await db.Site.findAll({
                    attributes: ['SiteID', 'ClientID', 'Site', 'Description', 'Address',
                        'AptSuite', 'City', 'State', 'PostalCode', 'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn'],
                    where: { SiteID: siteid, IsActive: true, IsDeleted: false }
                }) : await db.Site.findAll({
                    attributes: ['SiteID', 'ClientID', 'Site', 'Description', 'Address', 'AptSuite',
                        'City', 'State', 'PostalCode', 'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn']
                });
                if (sites.length > 0) {
                    res.status(200).send({ 'message': 'Success', data: sites });
                } else {
                    res.status(404).send({ 'message': 'data not found' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        postSite: async (req, res) => {
            const { clienid, site, description, address, aptsuite, city, state, postalcode } = req.body;
            try {
                if (clienid !== undefined && site !== undefined &&
                    description !== undefined && address !== undefined &&
                    aptsuite !== undefined && city !== undefined &&
                    state !== undefined && postalcode !== undefined) {
                    const postres = await db.Site.create({
                        ClientID: clienid,
                        Site: site,
                        Description: description,
                        Address: address,
                        AptSuite: aptsuite,
                        City: city,
                        State: state,
                        PostalCode: postalcode
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
        deleteSite: async (req, res) => {
            const { siteid } = req.query;
            try {
                const updateRecords = await db.Site.update(
                    {
                        IsDeleted: true,
                        ModifiedOn: new Date().toISOString()
                    },
                    {
                        where: { SiteID: siteid }
                    }
                );
                if (updateRecords !== null) {
                    res.status(200).send({ 'message': `Site:${siteid} deleted successfully` });
                } else {
                    res.status(400).send({ 'message': 'Error in deleting site data' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        updateSite: async (req, res) => {
            const { siteid } = req.query;
            const { clienid, site, description, address, aptsuite, city, state, postalcode } = req.body;
            try {
                if (clienid !== undefined && site !== undefined &&
                    description !== undefined && address !== undefined &&
                    aptsuite !== undefined && city !== undefined &&
                    state !== undefined && postalcode !== undefined) {
                    const updateRecords = await db.Site.update(
                        {
                            ClientID: clienid,
                            Site: site,
                            Description: description,
                            Address: address,
                            AptSuite: aptsuite,
                            City: city,
                            State: state,
                            PostalCode: postalcode,
                            ModifiedOn: new Date().toISOString()
                        },
                        {
                            where: { SiteID: siteid }
                        }
                    );
                    if (updateRecords !== null) {
                        res.status(200).send({ 'message': `Site:${siteid} updated successfully` });
                    } else {
                        res.status(400).send({ 'message': 'Error in updating site data' });
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