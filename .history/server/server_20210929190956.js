const express = require('express');
const cors = require('cors');

const { dbOpen, db } = require('../database/config.db')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Conectar con la base de datos


    }

    listen() {
        //Conectar con la base de datos e iniciar servidor
        db.sequelize.sync().done(() => {
            this.app.listen(this.port, () => {
            console.log(`Server listening port ${this.port}`);
        })
        })
    }
}

module.exports = Server;