/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsers);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    // check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'Inserte un email válido').isEmail(),
    validarCampos
], createUser);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'Inserte un email válido').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
], updateUser);

router.delete('/:id', validarJWT, deleteUser);

module.exports = router;