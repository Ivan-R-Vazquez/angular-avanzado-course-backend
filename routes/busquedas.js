/*
    Ruta: /api/todo
*/

const { Router } = require('express');
const { getAll, getCollection } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJWT, getAll);
router.get('/:coleccion/:busqueda', validarJWT, getCollection);

module.exports = router;