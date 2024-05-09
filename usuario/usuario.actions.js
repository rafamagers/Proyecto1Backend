const Usuario = require("./usuario.model")

async function getUsuarioMongo(filtros) {
    const cantidadUsuarios = await Usuario.countDocuments(filtros);
    const UsuariosFiltrados = await Usuario.find(filtros);

    return {
        resultados: UsuariosFiltrados,
        // paginaMax: cantidadUsuarios / 20,
        // paginaActual: 1,
        cantidadUsuarios: cantidadUsuarios
    };
}

async function createUsuarioMongo(datos) {
    const UsuarioCreado = await Usuario.create(datos);

    return UsuarioCreado;
}

async function updateUsuarioMongo(id, cambios) {
    const resultado = await Usuario.findByIdAndUpdate(id, cambios);

    return resultado
}

async function deleteUsuarioMongo(id) {
    const resultado = await Usuario.findByIdAndDelete(id);
    
    return resultado;
}

module.exports = {
    createUsuarioMongo,
    getUsuarioMongo,
    updateUsuarioMongo,
    deleteUsuarioMongo
};