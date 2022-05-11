const fs = require('fs');
const path = require('path');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async (req, res = response) => {
    const coleccion = req.params.coleccion;
    const id = req.params.id;

    // Validar tipo
    const coleccionesValidas = ['hospitales', 'medicos', 'usuarios'];

    if (!coleccionesValidas.includes(coleccion)) {
        return res.status(400).json({
            ok: false,
            msg: 'La colección debe de ser de medicos, hospitales o usuarios'
        })
    }

    // Validar que existe archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imágen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Formato de imágen no válido'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imágen
    const path = `./uploads/${coleccion}/${nombreArchivo}`;

    // Mover imágen
    file.mv(path, async function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imágen'
            });
        }

        // Actualizar base de datos
        const updated = await actualizarImagen(coleccion, id, nombreArchivo);
        if (!updated) {
            fs.unlinkSync(path);
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró registro con ese id'
            });
        }


        res.json({
            ok: true,
            msg: 'Archivo subido exitosamente',
            nombreArchivo
        });
    });
}

const getFile = (req, res = response) => {
    const coleccion = req.params.coleccion;
    const foto = req.params.foto;

    let pathImg = path.join(__dirname, `../uploads/${coleccion}/${foto}`);

    // Imágen por defecto
    if (!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    }
    res.sendFile(pathImg);
}

module.exports = {
    fileUpload,
    getFile
}