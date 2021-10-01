require('dotenv').config();
const Server = require('./server/server');

//Instanciación de objeto servidor, donde se encapsula la lógica de éste
const server = new Server();



//Inicio de la base de datos y el servidor
server.listen();