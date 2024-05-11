const express = require('express')
const router = express.Router();
const { readPedidoConFiltros, readPedido, createPedido, updatePedido, deletePedido } = require("./pedido.controller");
const { respondWithError } = require('../utils/functions');
const { verificarTokenJWT } = require('../login/login.actions'); // Función para crear tokens
const { getLibroMongo } = require('../libro/libro.actions'); // Función para crear tokens

async function GetPedidos(req, res) {
  try {

    resultadosBusqueda = await readPedidoConFiltros(req.query, req.userId);
    res.status(200).json({
      resultadosBusqueda
    })

  } catch (e) {
    res.status(500).json({ msg: e.message })
  }
}
async function GetPedidosId(req, res) {
  try {
    const resultadosBusqueda = await readPedido(req.params.id);
    res.status(200).json({
      resultadosBusqueda
    })
  } catch (e) {
    res.status(500).json({ msg: "Pedido no encontrado" })
  }
}
async function PostPedido(req, res) {
  const pedidoData = {
    ...req.body,
    idComprador: req.userId, // El ID del usuario autenticado
  };
  // Manejo de errores para crear el pedido
  try {
    // Crea el pedido con la información proporcionada
    const pedidoCreado = await createPedido(pedidoData);
    res.status(200).json({
      mensaje: 'Pedido creado exitosamente. 👍',
      pedido: pedidoCreado,
    });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Respuesta al cliente
  }
}

async function PatchPedidos(req, res) {
  try {
    // llamada a controlador con los datos
    await updatePedido(req.body, req.userId);

    res.status(200).json({
      mensaje: "Pedido modificado. 👍"
    })
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}


async function DeletePedidos(req, res) {
  try {
    // llamada a controlador con los datos
    await deletePedido(req.params.id, req.userId);
    res.status(200).json({
      mensaje: "Pedido eliminado. 👍"
    })
  } catch (e) {
    res.status(500).json({ error: e.message }); // Devuelve respuesta al cliente
  }
}

router.get("/", verificarTokenJWT, GetPedidos);
router.get("/:id", verificarTokenJWT, GetPedidosId);
router.post("/", verificarTokenJWT, PostPedido);
router.patch("/", verificarTokenJWT, PatchPedidos);
router.delete("/:id", verificarTokenJWT, DeletePedidos);


module.exports = router;