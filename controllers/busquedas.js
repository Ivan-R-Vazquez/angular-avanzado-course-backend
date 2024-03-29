const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getAll = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);
    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const getCollection = async (req, res = response) => {
    const coleccion = req.params.coleccion;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data;

    switch (coleccion) {
        case 'medicos':
            data = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img');
            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;

        default:
            return res.status(404).json({
                ok: false,
                msg: 'La colección debe de ser de medicos, hospitales o usuarios'
            });
        }
        res.json({
            ok: true,
            resultados: data
        });
}

module.exports = {
    getAll,
    getCollection
}