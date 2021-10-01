const express = require('express');
const cors = require('cors');

const { dbOpen} = require('../database/config.db')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //rutas de los servicios
        this.paths = {
            films: '/api/films',
            comments: '/api/comments'
        }

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.films, require('../routes/films.routes'));
    }

    listen() {
        //Conectar con la base de datos e iniciar servidor
        dbOpen().sequelize.sync().done(() => {
            this.app.listen(this.port, () => {
                console.log(`Server listening port ${this.port}`);
            });
        });
    }
}

module.exports = Server;