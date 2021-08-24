const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {
	const {limite = 5, desde = 0} = req.query;

	const [total, usuarios] = await Promise.all([Usuario.countDocuments({estado: true}), Usuario.find({estado: true}).skip(desde).limit(Number(limite))]);

	res.json({
		total,
		usuarios
	});
};

const usuariosPost = async (req = request, res = response) => {
	const {nombre, correo, password, rol} = req.body;
	const usuario = new Usuario({nombre, correo, password, rol});

	//Hashear contraseña
	const salt = bcryptjs.genSaltSync(10);
	usuario.password = bcryptjs.hashSync(password, salt);

	//Guardar en DB
	await usuario.save();

	res.json({
		msg: 'post API - Controllador',
		usuario
	});
};

const usuariosPut = async (req, res = response) => {
	const {id} = req.params;
	const {_id, password, google, correo, ...rest} = req.body;

	//TODO: vlidar contra DB
	if (password) {
		//Hashear contraseña
		const salt = bcryptjs.genSaltSync(10);
		rest.password = bcryptjs.hashSync(password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, rest);

	res.json(usuario);
};

const usuariosDelete = async (req, res = response) => {
	const {id} = req.params;

	const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

	console.log(usuario);

	res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
	res.json({
		msg: 'patch API - Controllador'
	});
};

module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosDelete,
	usuariosPatch
};
