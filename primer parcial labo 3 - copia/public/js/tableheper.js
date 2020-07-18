
function crearTabla(array) {
    var tabla = document.createElement('table');

    let cabecera = document.createElement('tr');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    for (let atriubuto in array[0]) {
        let th = document.createElement('th');
        th.textContent = atriubuto;

        if (atriubuto != "active") {
            cabecera.appendChild(th);
            thead.appendChild(cabecera);
        }
    }

    tabla.appendChild(thead);

    for (var i = 0; i < array.length; i++) {
        var fila = document.createElement("tr");
        var unObjeto = array[i];

        for (let j in unObjeto) {
            if (unObjeto[j] == unObjeto["active"])
                continue;
            var celda = document.createElement('td');
            celda.textContent = unObjeto[j];
            fila.appendChild(celda);
        }

        tbody.appendChild(fila);
        tabla.appendChild(tbody);
    }
    tabla.setAttribute("id", "listaAnuncio");
    return tabla;
}

function estiloTabla() {
    var tabla = document.getElementById("listaAnuncio");
    tabla.classList.add("table", "table-bordered", "table-striped");
}

export { crearTabla, estiloTabla };