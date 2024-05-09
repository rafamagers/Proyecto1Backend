const { throwCustomError } = require("../utils/functions");
const { createLibroMongo, getLibroMongo, updateLibroMongo, deleteLibroMongo } = require("./libro.actions");

async function readLibroConFiltros(query) {
    const { tipo, relleno, precio, masa, cantidad, coccion } = query;

    // hacer llamado a base de datos con el filtro de tipo
    const resultadosBusqueda = await getLibroMongo(query);

    return resultadosBusqueda;
}

async function createLibro(datos) {
    const { tipo, relleno, precio, masa, cantidad, coccion } = datos;

    const LibroSimilar = await getLibroMongo({masa});

    // hacer llamado a base de datos con el filtro de tipo
    const LibroCreado = await createLibroMongo(datos);

    return LibroCreado;
}


function updateLibro(datos) {
    const { _id, ...cambios } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const LibroCreado = updateLibroMongo(_id, cambios);

    return LibroCreado;
}

function deleteLibro(id) {

    // hacer llamado a base de datos con el filtro de tipo
    const LibroCreado = deleteLibroMongo(id);

    return LibroCreado;
}

module.exports = {
    readLibroConFiltros,
    createLibro,
    updateLibro,
    deleteLibro
}