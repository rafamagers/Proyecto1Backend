const { throwCustomError } = require("../utils/functions");
const { createUsuarioMongo, getUsuarioMongo, getUsuariosMongo, updateUsuarioMongo, softDeleteUsuarioMongo } = require("./usuario.actions");


async function readUsuario(id, userId) {
  console.log(id)
  console.log(userId)
  if (id !== userId) {
    throw new Error('Usted no es el dueño de esta cuenta, no la puede ver');
  }
  const resultadosBusqueda = await getUsuarioMongo(id);
  return resultadosBusqueda;
}

async function createUsuario(datos) {

  // hacer llamado a base de datos con el filtro de tipo
  const UsuarioCreado = await createUsuarioMongo(datos);

  return UsuarioCreado;
}


async function updateUsuario(datos, userId) {
  const { _id, ...cambios } = datos;
  console.log(cambios)
  const usuario = await Usuario.findById(id)
  if (!usuario) {
    throw new Error("Usuario no existe")
  }
  if (id !== userId) {
    throw new Error('Esta no es su cuenta, no puede modificarla');
  }

  // hacer llamado a base de datos con el filtro de tipo
  const UsuarioCreado = await updateUsuarioMongo(_id, cambios);

  return UsuarioCreado;
}
async function deleteUsuario(id, userId) {

  const usuario = await Usuario.findById(id)
  console.log(usuario)
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  } else {

    if (id !== userId) {
      throw new Error('Usted no es el dueño de esta cuenta, no la puede eliminar');
    }
  }

  // Usa `await` para asegurarte de que el error se propague adecuadamente
  const usuarioEliminado = await softDeleteUsuarioMongo(id);

  return usuarioEliminado; // Devuelve el usuario eliminado

}
module.exports = {

  readUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario
}