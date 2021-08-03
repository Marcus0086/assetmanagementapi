const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models/index")
const { ApiRouter } = require('./routes/Routes');

const main = async () => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', ApiRouter)
    db.sequelize.sync().then(() => {
        app.listen(3004, () => {
            console.log(`Server is running on port 3004.`);
        });
    })
};

main()