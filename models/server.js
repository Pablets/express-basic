const express = require('express');
const cors = require('cors');
// const swaggerAutogen = require('swagger-autogen')();

class Server {
	constructor() {
		this.app = express();
		this.port = 3000;
		this.usuariosPath = '/api/usuarios';

		this.middlewares();

		this.routes();
	}

	middlewares() {
		// CORS
		this.app.use(cors());
		// Lectura y parseo del body
		this.app.use(express.json());
		//directorio público
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.usuariosPath, require('../routes/usuarios'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Example app listening at http://localhost:${this.port}`);
		});
	}
}

module.exports = Server;
