const Libro = require("../libro/libro.model");
const Usuario = require("./usuario.model")


async function getUsuarioMongo(id) {
    const usuario = await Usuario.findById(id);
    if (usuario.isDeleted) {
        throw error;
    } else {
        return usuario

    }
}
async function createUsuarioMongo(datos) {
    try {
        const usuarioCreado = await Usuario.create(datos); // Crea el usuario con los datos proporcionados
        return usuarioCreado; // Devuelve el usuario creado
    } catch (error) {
        console.error('Error al crear el usuario:', error); // Registro de error en consola
        throw error; // Vuelve a lanzar el error para que el llamador lo maneje
    }
}
async function updateUsuarioMongo(id, cambios) {
   
        const resultado = await Usuario.findByIdAndUpdate(id, cambios);
        return resultado

}


async function softDeleteUsuarioMongo(id, userId) {
  
        // Encuentra el usuario por ID y marca isDeleted como true
        const usuarioEliminado = await Usuario.findByIdAndUpdate(
            id, // ID del usuario
            { isDeleted: true }, // Campos a actualizar
            { new: true } // Devuelve el documento actualizado
        );


        return usuarioEliminado; // Devuelve el usuario marcado como eliminado
   
}

module.exports = {
    createUsuarioMongo,
    getUsuarioMongo,
    updateUsuarioMongo,
    softDeleteUsuarioMongo
};