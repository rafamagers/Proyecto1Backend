const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({});
})
const rutasLibro = require("./libro/libro.route")
const rutasUsuario = require("./usuario/usuario.route")
const rutasPedido = require("./pedido/pedido.route")
const rutasLogin = require("./login/login.route")
app.use('/libro', rutasLibro);
app.use('/pedido', rutasPedido);
app.use('/usuario', rutasUsuario);
app.use('/login', rutasLogin);

// aqui va la connection string VVVVV
uri = 'mongodb+srv://ramontero:hDrShO2y2iGhce0g@backend.mu9yj0y.mongodb.net/?retryWrites=true&w=majority&appName=Backend';
mongoose.connect(uri, { useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error al conectarse a MongoDB Atlas:', error);
  });
app.listen(8080);

