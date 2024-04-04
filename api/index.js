const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// template for datos.json path
const datosPath = "/datos.json";

// endpoint /express that returns the list of items in datos.json
app.get("/obtenerDatos", (req, res) => res.sendFile(datosPath, { root: '.'}));

// endpoint called cliente_servidor that returns the list of items in datos.json

app.get("/cliente_servidor", (req, res) => res.send(JSON.stringify(datos)));

app.use(express.static('public'))

app.listen(PORT, () => console.log("Server ready on port " + PORT + "."));

module.exports = app;
