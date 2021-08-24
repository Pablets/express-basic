const {Router} = require('express');
const {check} = require('express-validator');
const {usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch} = require('../controllers/usuarios');
const {validarCampos} = require('../middlewares/validar-campos');
const {esRoleValido, emailExiste, existeUsuarioPorId, existeUsuarioPorEstado} = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

// check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

//prettier-ignore
router.post('/', [
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	check('password', 'El password debe ser de mas de 6 caracteres').isLength({min: 6}),
	check('correo', 'El correo no es válido').isEmail(),
	check('correo').custom(emailExiste),
	check('rol').custom(esRoleValido),
	validarCampos
],
usuariosPost);

//prettier-ignore
router.put('/:id', [
	check('id', 'No es un ID válido').isMongoId(),
	check('id').custom(existeUsuarioPorId),
	check('rol').custom(esRoleValido),
	validarCampos
], usuariosPut);

//prettier-ignore
router.delete('/:id',[
	check('id', 'No es un ID válido').isMongoId(),
	check('id').custom(existeUsuarioPorId),
	validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;
