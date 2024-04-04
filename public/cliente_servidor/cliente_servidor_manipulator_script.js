function obtenerDatos() {
    ulHTML = document.getElementById("listado_inscripciones");
    fetch("/obtenerDatos")
    .then(
        response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            liTemplateHTML = document.createElement("li");
            liTemplateHTMLclasses = ulHTML.firstElementChild.getAttribute("class");

            // Remove the color of liTemplateHTMLclasses
            liTemplateHTMLclasses = liTemplateHTMLclasses.replace("bg-blue-500","bg-gray-100");
            
            liTemplateHTML.setAttribute("class", liTemplateHTMLclasses);
            liTemplateHTML.innerHTML = `<p>${data[i].nombre}</p> <p>${data[i].dni}</p> <p>${data[i].lu}</p> <p>${data[i].email}</p> <p>${data[i].fecha}</p>`;
            ulHTML.appendChild(liTemplateHTML);
        }
    })
}
