const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;

// template for datos.json path
const datosPath = "api/datos.json";

// endpoint that returns the list of items in datos.json
app.get("/cliente_servidor", (req, res) => res.sendFile(datosPath, { root: '.'}));

// endpoint that dyanmically generates the list of items in datos.json
app.get("/express", (req, res) => {
    //Retrive express/listado_tailwindcss.html from public
    let staticHTML = fs.readFileSync('public/express/listado_tailwindcss.html');
    fs.readFile('public/express/listado_tailwindcss.html', 'utf8', (err, staticHTML) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        fs.readFile(datosPath, (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                let datos = JSON.parse(data);
                let dynamicHTML = "";
                let modifiedHTML = "";
                for (let i = 0; i < datos.length; i++) {
                    dynamicHTML += '<li class="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 space-y-2 sm:space-y-0 sm:p-3 bg-gray-100 sm:rounded-lg">'+
                    '<p>' + datos[i].nombre + '</p>' +
                    '<p>' + datos[i].dni + '</p>' +
                    '<p>' + datos[i].lu + '</p>' +
                    '<p>' + datos[i].email + '</p>' +
                    '<p>' + datos[i].fecha + '</p> </li>';
                }
                modifiedHTML = staticHTML.replace('</ul>', dynamicHTML + '</ul>');
                res.send(modifiedHTML);
            }
        })
    });

});

app.get("/test", (req, res) => {
    let lsFiles = "";
    fs.readdir(process.cwd()+"/api", (err, files) => {
        files.forEach(file => {
            console.log(file);
          lsFiles += file + "\n";
        });
      });
    res.send(lsFiles);
});

app.use(express.static('public'))

app.listen(PORT, () => console.log("Server ready on port " + PORT + "."));

module.exports = app;
