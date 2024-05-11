const { throwCustomError } = require("../utils/functions");
const { createPedidoMongo, getPedidoMongo,getPedidosMongo, updatePedidoMongo, softDeletePedidoMongo} = require("./pedido.actions");

async function readPedidoConFiltros(query) {
    const resultadosBusqueda = await getPedidosMongo(query);
    return resultadosBusqueda;
}
async function readPedido(id) {
    const resultadosBusqueda = await getPedidoMongo(id);
    return resultadosBusqueda;
}

async function createPedido(datos) {
 
    const primerlibro = await Libro.findById(datos.libros[0])
    console.log(primerlibro.vendedor)
    const dueñolibros = primerlibro.vendedor.toHexString()
    for (const lib of datos.libros) {
        const libro = await Libro.findById(lib)
        console.log(dueñolibros)
        console.log("vende:")
        console.log(libro.vendedor)
        if (dueñolibros!==libro.vendedor.toHexString()) {
          throw new Error('Libros de vendedores diferentes: '); // Error si el libro no existe
        }
      }
  // Si el vendedor es válido, crea el pedido
  const PedidoCreado = await createPedidoMongo(datos); // Crea el pedido con los datos proporcionados
  return PedidoCreado; // Devuelve el pedido creado
 
}


async function updatePedido(datos, userId) {
    const { _id, ...cambios } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const PedidoCreado = await updatePedidoMongo(_id, cambios, userId);

    return PedidoCreado;
}
async function deletePedido(id, userId) {
    try {
      // Usa `await` para asegurarte de que el error se propague adecuadamente
      const pedidoEliminado = await softDeletePedidoMongo(id, userId); 
      
      return pedidoEliminado; // Devuelve el pedido eliminado
    } catch (error) {
      throw error; // Lanza el error para que el llamador lo maneje
    }
  }
module.exports = {
    readPedidoConFiltros,
    readPedido,
    createPedido,
    updatePedido,
    deletePedido
}