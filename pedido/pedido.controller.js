const { throwCustomError } = require("../utils/functions");
const { getLibroMongo, getLibrosMongo } = require("../libro/libro.actions");
const Libro = require("../libro/libro.model");
const { createPedidoMongo, getPedidoMongo, getPedidosMongo, updatePedidoMongo, softDeletePedidoMongo } = require("./pedido.actions");
const Pedido = require("./pedido.model")

async function readPedidoConFiltros(query, userId) {
  const { estado, fechainicio, fechafin, todo, ...resto } = query;

  if (Object.keys(resto).length > 0) {
    throw new Error("No puedes filtrar por eso");
  }
  const { todo: todito, fechainicio: fechitai, fechafin: fechitaf, ...filtros } = query;
  if (fechafin && fechainicio) {
    filtros.createdAt = {

      $gte: fechainicio,
      $lte: fechafin,

    }
  }

  var resultadosBusqueda;
  console.log(filtros)
  console.log(todo)
  if (todo === "true") {
    resultadosBusqueda = await getPedidosMongo(filtros);

  } else {
    console.log("here")
    resultadosBusqueda = await getPedidosMongo({ ...filtros, isDeleted: false });
  }
  console.log("hereee")

  console.log(resultadosBusqueda)
  const resultadosFiltrados = await Promise.all(resultadosBusqueda.resultados.map(async (pedido) => {
    if (pedido.libros && pedido.libros.length > 0) {
      // Obtener el libro de la base de datos
      const libro = await getLibroMongo(pedido.libros[0]);

      // Verificar si el vendedor del libro es igual a userID
      if (libro.vendedor.toHexString() === userId || pedido.idComprador.toHexString() === userId) {
        return pedido; // Si el vendedor coincide, retornar el pedido
      }
    } else {
      if (pedido.idComprador.toHexString() === userId) {
        return pedido; // Si el vendedor coincide, retornar el pedido
      }
    }
    return null; // Si no se encontró ningún libro del vendedor, retornar null
  }));

  // Filtrar los resultados para eliminar los valores nulos (pedidos que no coinciden con el criterio)
  return resultadosFiltrados.filter(pedido => pedido !== null);


}
async function readPedido(id) {
  const resultadosBusqueda = await getPedidoMongo(id);
  return resultadosBusqueda;
}

async function createPedido(datos) {
  // Manejo de errores para verificar libros

  for (const idlibro of datos.libros) {
    // Verifica cada libro para asegurar que existe
    const libro = await getLibroMongo(idlibro);

    if (!libro) {
      throw new Error('Libro no encontrado: ' + idlibro); // Error si el libro no existe
    }
  }

  const primerlibro = await Libro.findById(datos.libros[0])
  console.log(primerlibro.vendedor)
  const dueñolibros = primerlibro.vendedor.toHexString()
  for (const lib of datos.libros) {
    const libro = await Libro.findById(lib)
    console.log(dueñolibros)
    console.log("vende:")
    console.log(libro.vendedor)
    if (dueñolibros !== libro.vendedor.toHexString()) {
      throw new Error('Libros de vendedores diferentes'); // Error si el libro no existe
    }
  }
  // Si el vendedor es válido, crea el pedido
  const PedidoCreado = await createPedidoMongo(datos); // Crea el pedido con los datos proporcionados
  return PedidoCreado; // Devuelve el pedido creado

}


async function updatePedido(datos, userId) {
  const { _id, ...cambios } = datos;
  console.log(cambios)
  const pedido = await Pedido.findById(_id)
  if (!pedido) {
    throw new Error("Pedido no existe")
  }
  //Caso para cancelar un pedido
  if (cambios.estado === "cancelado") {
    const dueño = pedido.idComprador.toHexString()
    if (dueño !== userId) {

      throw new Error('Usted no es el comprador de este pedido, no puede actualizar');
    } else {
      const resultado = await updatePedidoMongo(_id, cambios);
      return resultado

    }
  } else {

    const primerlibro = await Libro.findById(pedido.libros[0])
    const dueñolibros = primerlibro.vendedor.toHexString()
    console.log(dueñolibros)
    console.log(userId)
    if (dueñolibros !== userId) {
      throw new Error('Usted no es el dueño de los libros por lo que no puede completar el pedido');
    }
    else {
      const resultado = await updatePedidoMongo(_id, cambios);
      return resultado

    }

  }

}
async function deletePedido(id, userId) {
  const pedido = await Pedido.findById(id);
  console.log(pedido)
  if (!pedido) {
    throw new Error('Pedido no encontrado');
  } else {
    dueño = pedido.vendedor.toHexString()
    if (dueño !== userId) {
      throw new Error('Usted no es el dueño de este pedido, no puede eliminarlo');
    }
  }
  // Usa `await` para asegurarte de que el error se propague adecuadamente
  const pedidoEliminado = await softDeletePedidoMongo(id, userId);

  return pedidoEliminado; // Devuelve el pedido eliminado

}
module.exports = {
  readPedidoConFiltros,
  readPedido,
  createPedido,
  updatePedido,
  deletePedido
}