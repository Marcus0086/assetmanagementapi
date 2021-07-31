const db = require('../models/index')
module.exports = {
    CRUDClient: {
        getClient: async (req, res) => {
            const { clientid } = req.query;
            try {
                const clients = clientid !== undefined ? await db.client.findAll({
                    attributes: ['ClientID', 'ClientName', 'ContactName', 'ContactEmail', 'ContactPhone',
                        'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn'],
                    where: { ClientID: clientid, IsActive: true, IsDeleted: false }
                }) : await db.client.findAll({
                    attributes: ['ClientID', 'ClientName', 'ContactName', 'ContactEmail', 'ContactPhone',
                        'IsActive', 'IsDeleted', 'CreatedOn', 'ModifiedOn']
                });
                if (clients.length > 0) {
                    res.status(200).send({ 'message': 'Success', data: clients });
                } else {
                    res.status(404).send({ 'message': 'data not found' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        newClient: async (req, res) => {
            const { clientname, contactname, contactemail, contactphone } = req.body;
            try {
                if (clientname !== undefined &&
                    contactname !== undefined && contactemail !== undefined &&
                    contactphone !== undefined) {
                    const postres = await db.client.create({
                        ClientName: clientname,
                        ContactName: contactname,
                        ContactPhone: contactphone,
                        ContactEmail: contactemail
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
        deleteClient: async (req, res) => {
            const { clientid } = req.query;
            try {
                const updateRecords = await db.client.update(
                    {
                        IsDeleted: true,
                        ModifiedOn: new Date().toISOString()
                    },
                    {
                        where: { ClientID: clientid }
                    }
                );
                if (updateRecords !== null) {
                    res.status(200).send({ 'message': `Client:${clientid} deleted successfully` });
                } else {
                    res.status(400).send({ 'message': 'Error in deleting client data' });
                }
            } catch (e) {
                console.log(e);
                res.status(500).send(e);
            }
        },
        updateClient: async (req, res) => {
            const { clientid } = req.query;
            const { clientname, contactname, contactemail, contactphone } = req.body;
            try {
                if (clientname !== undefined &&
                    contactname !== undefined && contactemail !== undefined &&
                    contactphone !== undefined) {
                    const updateRecords = await db.client.update(
                        {
                            ClientName: clientname,
                            ContactName: contactname,
                            ContactPhone: contactphone,
                            ContactEmail: contactemail,
                            ModifiedOn: new Date().toISOString()
                        },
                        {
                            where: { ClientID: clientid }
                        }
                    );
                    if (updateRecords !== null) {
                        res.status(200).send({ 'message': `Client:${clientid} updated successfully` });
                    } else {
                        res.status(400).send({ 'message': 'Error in updating client data' });
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