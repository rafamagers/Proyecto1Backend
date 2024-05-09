const { throwCustomError } = require("../utils/functions");
const { createPedidoMongo, getPedidoMongo, updatePedidoMongo, deletePedidoMongo } = require("./pedido.actions");

async function readPedidoConFiltros(query) {
    const { tipo, relleno, precio, masa, cantidad, coccion } = query;

    // hacer llamado a base de datos con el filtro de tipo
    const resultadosBusqueda = await getPedidoMongo(query);

    return resultadosBusqueda;
}

async function createPedido(datos) {
    const { tipo, relleno, precio, masa, cantidad, coccion } = datos;

    const PedidoSimilar = await getPedidoMongo({masa});

    // hacer llamado a base de datos con el filtro de tipo
    const PedidoCreado = await createPedidoMongo(datos);

    return PedidoCreado;
}


function updatePedido(datos) {
    const { _id, ...cambios } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const PedidoCreado = updatePedidoMongo(_id, cambios);

    return PedidoCreado;
}

function deletePedido(id) {

    // hacer llamado a base de datos con el filtro de tipo
    const PedidoCreado = deletePedidoMongo(id);

    return PedidoCreado;
}

module.exports = {
    readPedidoConFiltros,
    createPedido,
    updatePedido,
    deletePedido
}