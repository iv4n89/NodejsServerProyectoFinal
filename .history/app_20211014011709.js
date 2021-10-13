require('dotenv').config();
const Server = require('./server/server');

//Instanciación de objeto servidor, donde se encapsula la lógica de éste
const server = new Server();

//Manejar todas las posibles rutas:
    server.app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public/index.html')));

//Inicio de la base de datos y el servidor
server.listen();