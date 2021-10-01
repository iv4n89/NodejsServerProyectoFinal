const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening port ${this.port}`);
        })
    }
}

module.exports = Server;