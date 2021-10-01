const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

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

        db = {
            sequelize,
            Sequelize,
            models: {}
        };

        const dir = path.join(__dirname, 'models');
        fs.readdirSync(dir).forEach(filename => {
            const modelDir = path.join(dir, filename);
            const model = sequelize.import(modelDir);
    });
    }

    return db;

}