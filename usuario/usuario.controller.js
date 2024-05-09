const { throwCustomError } = require("../utils/functions");
const { createUsuarioMongo, getUsuarioMongo, updateUsuarioMongo, deleteUsuarioMongo } = require("./usuario.actions");

async function readUsuarioConFiltros(query) {
    const { tipo, relleno, precio, masa, cantidad, coccion } = query;

    // hacer llamado a base de datos con el filtro de tipo
    const resultadosBusqueda = await getUsuarioMongo(query);

    return resultadosBusqueda;
}

async function createUsuario(datos) {
    const { tipo, relleno, precio, masa, cantidad, coccion } = datos;

    const UsuarioSimilar = await getUsuarioMongo({masa});

    // hacer llamado a base de datos con el filtro de tipo
    const UsuarioCreado = await createUsuarioMongo(datos);

    return UsuarioCreado;
}


function updateUsuario(datos) {
    const { _id, ...cambios } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const UsuarioCreado = updateUsuarioMongo(_id, cambios);

    return UsuarioCreado;
}

function deleteUsuario(id) {

    // hacer llamado a base de datos con el filtro de tipo
    const UsuarioCreado = deleteUsuarioMongo(id);

    return UsuarioCreado;
}

module.exports = {
    readUsuarioConFiltros,
    createUsuario,
    updateUsuario,
    deleteUsuario
}