const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');
// const swaggerAutogen = require('swagger-autogen')();

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usuariosPath = '/api/usuarios';

		//Conectar a DB
		this.conectarDB();
		// middlewares
		this.middlewares();

		this.routes();
	}

	async conectarDB() {
		await dbConnection();
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
