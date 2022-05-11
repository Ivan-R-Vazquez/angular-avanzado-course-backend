const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
    const hospitales = await Hospital.find().populate('usuario', 'nombre img');
    res.json({
        ok: true,
        hospitales
    })
}

const createHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Hable con el administrador'
        });
    }
}

const updateHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'updateHospitals'
    })
}

const deleteHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteHospitals'
    })
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}