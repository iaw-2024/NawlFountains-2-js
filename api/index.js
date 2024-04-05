const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;


// template for datos.json path

// endpoint that returns the list of items in datos.json
// app.get("/cliente_servidor", (req, res) => res.sendFile(`/datos.json`, { root: '.'}));

// endpoint which fetch the list of items in datos.json
app.get("/cliente_servidor", (req, res) => {
    let dataURL = "http://"+req.hostname+"/datos.json";
    fetch(dataURL)
    .then(
        response => response.json())
    .then(data => {
        res.send(data);
    })
});

// endpoint that dyanmically generates the list of items in datos.json
app.get("/express", async (req, res) => {
    let staticHTMLURL = "http://"+req.hostname+":3001/express/listado_tailwindcss.html";
    let staticHTMLResponse = await fetch(staticHTMLURL);
    let staticHTML = await staticHTMLResponse.text();

    // console.log(staticHTML);
    // let dataURL = "http://"+req.hostname+":3001/datos.json";
    // let dataURLResponse = await fetch(dataURL);
    // let data = await dataURLResponse.json();

    // console.log(data);
    // let dynamicHTML = "";
    // let modifiedHTML = "";

    // for (let i = 0; i < data.length; i++) {
    //     dynamicHTML += '<li class="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 space-y-2 sm:space-y-0 sm:p-3 bg-gray-100 sm:rounded-lg">'+
    //     '<p>' + data[i].nombre + '</p>' +
    //     '<p>' + data[i].dni + '</p>' +
    //     '<p>' + data[i].lu + '</p>' +
    //     '<p>' + data[i].email + '</p>' +
    //     '<p>' + data[i].fecha + '</p> </li>';
    // }
    modifiedHTML = staticHTML.replace('</ul>', dynamicHTML + '</ul>');
    res.send(modifiedHTML);
});

app.use(express.static('public'))

app.listen(PORT, () => console.log("Server ready on port " + PORT + "."));

module.exports = app;
