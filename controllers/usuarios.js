const {response} = require('express');

const usuariosGet = (req, res = response) => {
	const {q, nombre = 'no name', apiKey, page = '1', limit = '10'} = req.query;
	res.json({
		msg: 'get API - Controllador',
		q,
		nombre,
		apiKey,
		page,
		limit
	});
};

const usuariosPost = (req, res = response) => {
	const {nombre, edad} = req.body;

	res.json({
		msg: 'post API - Controllador',
		nombre,
		edad
	});
};

const usuariosPut = (req, res = response) => {
	const id = req.params.id;

	res.json({
		msg: 'put API - Controllador',
		id
	});
};

const usuariosDelete = (req, res = response) => {
	res.json({
		msg: 'delete API - Controllador'
	});
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
