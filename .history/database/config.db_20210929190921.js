const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

let db = null;

const dbConfig = {
    database: process.env.DBNAME,
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    params: {
        dialect: process.env.DBDIALECT,
        storage: process.env.DBFILENAME,
        define: {
            underscore: true
        }
    }
}

const dbOpen = () => {

    if (!db) {
        const sequelize = new Sequelize(
            dbConfig.database,
            dbConfig.username,
            dbConfig.password,
            dbConfig.params
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
            db.models[model.name] = model;
        });

        Object.keys(db.models).forEach(key => {
            db.models[key].associate(db.models);
        });
    }

    return db;

}


module.exports = {
    dbOpen,
    db
}