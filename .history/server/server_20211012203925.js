const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbOpen} = require('../database/config.db')

//Clase para encapsular toda la lógica del servidor
class Server {
    constructor() {
        //Inicialización de servidor express
        this.app = express();
        //Se obtiene el puerto en el que correrá el servidor desde las variables de entorno
        this.port = process.env.PORT;

        //rutas de los servicios
        this.paths = {
            films: '/api/films',
            comments: '/api/comments',
            users: '/api/users',
            auth: '/api/auth'
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

        //Directorio publico
        this.app.use(express.static('public'));

        //Subida de archivos
        this.app.use(fuleUpload())
    }

    routes() {
        //Peliculas
        this.app.use(this.paths.films, require('../routes/films.routes'));
        //Comentarios
        this.app.use(this.paths.comments, require('../routes/comments.routes'));
        //Usuarios
        this.app.use(this.paths.users, require('../routes/users.routes'));
        //Login
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
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