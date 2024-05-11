const Libro = require("../libro/libro.model");
const Pedido = require("./pedido.model")

async function getPedidosMongo(filtros) {
  const cantidadPedidos = await Pedido.countDocuments(filtros);
  const PedidosFiltrados = await Pedido.find(filtros);
  return {
    resultados: PedidosFiltrados,
    // paginaMax: cantidadPedidos / 20,
    // paginaActual: 1,
    cantidadPedidos: cantidadPedidos
  };
}
async function getPedidoMongo(id) {
  const pedido = await Pedido.findById(id);
  if (pedido.isDeleted) {
    throw error;
  } else {
    return pedido

  }
}
async function createPedidoMongo(datos) {

  const pedidoCreado = await Pedido.create(datos); // Crea el pedido con los datos proporcionados
  return pedidoCreado; // Devuelve el pedido creado

}
async function updatePedidoMongo(id, cambios, userId) {
  try {
    console.log(cambios)
    const pedido = await Pedido.findById(id)
    if (!pedido) {
      throw new Error("Pedido no existe")
    }
    //Caso para cancelar un pedido
    if (cambios.estado === "cancelado") {
      const dueño = pedido.idComprador.toHexString()
      if (dueño !== userId) {

        throw new Error('Usted no es el comprador de este pedido, no puede actualizar');
      } else {
        const resultado = await Pedido.findByIdAndUpdate(id, cambios);
        return resultado

      }
    } else {
      if (cambios.estado === "completado") {
        const primerlibro = await Libro.findById(pedido.libros[0])
        const dueñolibros = primerlibro.vendedor
        if (dueñolibros !== userId) {
          throw new Error('Usted no es el dueño de los libros por lo que no puede completar el pedido');
        }
        else {
          const resultado = await Pedido.findByIdAndUpdate(id, cambios);
          return resultado

        }

      } else {
        throw new Error('Error');
      }
    }

  }
  catch (e) {
    throw e
  }
}


async function softDeletePedidoMongo(id, userId) {
  try {
    const pedido = await Pedido.findById(id)
    console.log(pedido)
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    } else {
      dueño = pedido.vendedor.toHexString()
      if (dueño !== userId) {
        throw new Error('Usted no es el dueño de este pedido');
      }
    }
    // Encuentra el pedido por ID y marca isDeleted como true
    const pedidoEliminado = await Pedido.findByIdAndUpdate(
      id, // ID del pedido
      { isDeleted: true }, // Campos a actualizar
      { new: true } // Devuelve el documento actualizado
    );


    return pedidoEliminado; // Devuelve el pedido marcado como eliminado
  } catch (error) {
    throw error
  }
}

module.exports = {
  getPedidosMongo,
  createPedidoMongo,
  getPedidoMongo,
  updatePedidoMongo,
  softDeletePedidoMongo
};