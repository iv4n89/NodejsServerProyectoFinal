const Sequelize = require('sequelize');

let db = null;

module.exports = app => {

    const config = app.libs.config;
    console.log(config);

    if (!db) {
        // new Sequelize();
    }

    return db;

}