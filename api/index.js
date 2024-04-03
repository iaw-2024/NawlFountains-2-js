const express = require("express");
const app = express();

// template for datos.json path
const datosPath = "./public/datos.json";

// endpoint /express that returns the list of items in datos.json
app.get("/obtenerDatos", (req, res) => res.sendFile(datosPath, { root: '.'}));

// endpoint called cliente_servidor that returns the list of items in datos.json

app.get("/cliente_servidor", (req, res) => res.send(JSON.stringify(datos)));

app.use(express.static('public'))

app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;