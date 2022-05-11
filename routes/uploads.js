/*
    Ruta: /api/upload
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, getFile } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.use(expressFileUpload());

router.put('/:coleccion/:id', validarJWT, fileUpload);
router.get('/:coleccion/:foto', getFile);

module.exports = router;