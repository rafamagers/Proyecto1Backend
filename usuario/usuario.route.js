const express = require('express')
const router = express.Router();
const { readUsuarioConFiltros, createUsuario, updateUsuario, deleteUsuario } = require("./usuario.controller");
const { respondWithError } = require('../utils/functions');

async function GetUsuarios(req, res) {
    try {
        // llamada a controlador con los filtros
        const resultadosBusqueda = await readUsuarioConFiltros(req.query);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch(e) {
        res.status(500).json({msg: ""})
    }
}

async function PostUsuario(req, res) {
    try {
        // llamada a controlador con los datos
        await createUsuario(req.body);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}


async function PatchUsuarios(req, res) {
    try {
        // llamada a controlador con los datos
        updateUsuario(req.body);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}


async function DeleteUsuarios(req, res) {
    try {
        // llamada a controlador con los datos
        deleteUsuario(req.params.id);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.get("/", GetUsuarios);
router.post("/", PostUsuario);
router.patch("/", PatchUsuarios);
router.delete("/:id", DeleteUsuarios);


module.exports = router;