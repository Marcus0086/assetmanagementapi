const db = require('../models/index')
module.exports = {
    CRUDLocation: {
        getLocation: async (req, res) => {
            const { locationid } = req.query;
            try {
                const locations = locationid !== undefined ? await db.location.findAll({
                    attributes: ['LocationID', 'SiteID', 'Location', 'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn'],
                    where: { LocationID: locationid, IsActive: true, IsDeleted: false }
                }) : await db.location.findAll({
                    attributes: ['LocationID', 'SiteID', 'Location', 'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn'],
                    where: { IsActive: true, IsDeleted: false }
                });
                if (locations.length > 0) {
                    res.status(200).send({ 'message': 'Success', data: locations });
                } else {
                    res.status(404).send({ 'message': 'data not found' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        newLocation: async (req, res) => {
            const { siteid, location } = req.body;
            try {
                if (siteid !== undefined && location !== undefined) {
                    const postres = await db.location.create({
                        SiteID: site,
                        Location: location
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
        deleteLocation: async (req, res) => {
            const { locationid } = req.query;
            try {
                const updateRecords = await db.location.update(
                    {
                        IsDeleted: true,
                        ModifiedOn: new Date().toISOString()
                    },
                    {
                        where: { LocationID: locationid }
                    }
                );
                if (updateRecords !== null) {
                    res.status(200).send({ 'message': `Location:${locationid} deleted successfully` });
                } else {
                    res.status(400).send({ 'message': 'Error in deleting location data' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        updateLocation: async (req, res) => {
            const { locationid } = req.query;
            const { siteid, location } = req.body;
            try {
                if (siteid !== undefined && location !== undefined) {
                    const updateRecords = await db.location.update(
                        {
                            SiteID: siteid,
                            Location: location,
                            ModifiedOn: new Date().toISOString()
                        },
                        {
                            where: { LocationID: locationid }
                        }
                    );
                    if (updateRecords !== null) {
                        res.status(200).send({ 'message': `Location:${locationid} updated successfully` });
                    } else {
                        res.status(400).send({ 'message': 'Error in updating location data' });
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