const Sequelize = require('sequelize');

let db = null;

module.exports = app => {

    const config = app.libs.config;

    if (!db) {
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );
    }

    return db;

}