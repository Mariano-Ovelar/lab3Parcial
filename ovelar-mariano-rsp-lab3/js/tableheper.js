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
    tabla.setAttribute("id", "tabla");
    return tabla;
}
function estiloTabla() {
    var tabla = document.getElementById("tabla");
    tabla.classList.add("table", "table-bordered", "table-striped", "table-hover");
}

function refrecarTabla(datos) {
    var tabla = document.getElementById("tabla");
    var btnGuardar = document.getElementById("btnGuardar");
    //desactivarBoton(btnGuardar);
    tabla.innerText = "";
    tabla.appendChild(Spinner());
    armarTabla(datos);
    activarBoton(btnGuardar);
    sacarPromedio(datos);
    sacarMaximo(datos);
    sacarMinimo(datos);
    sacarPorsentajeVacunacion(datos);
}

/* function Listar() {
    desactivarBoton(btnGuardar);
    tabla.innerText = "";
    //tabla.appendChild(Spinner());
} */
function armarTabla(datos) {
    var tabla = document.getElementById("tabla");
    tabla.innerText = "";
    tabla.appendChild(crearTabla(datos));
    estiloTabla();
    agregarEventosTabla();
}
function agregarEventosTabla() {
    let td = document.getElementsByTagName('td');

    for (let i = 0; i < td.length; i++) {

        td[i].addEventListener('click', function (e) {
            let tr = e.target.parentElement;
            let nodes = tr.childNodes;
            console.log(nodes);
            let anuncio = new Anuncio_Mascota(nodes[0].textContent, nodes[1].textContent, nodes[2].textContent
                , nodes[3].textContent, nodes[4].textContent, nodes[5].textContent, nodes[6].textContent
                , nodes[7].textContent, nodes[8].textContent);
            CargarFormulario(anuncio);
        });
    }
}

function Spinner() {
    var spinner = document.createElement('img');
    spinner.setAttribute('src', './img/loading.gif');
    spinner.setAttribute('alt', 'spinner');
    return spinner;
}

function colunasAOcultar(arrayColunas) {

    arrayColunas.map(function (ubicacion) {
        var col = "td:nth-child(" + ubicacion + "),th:nth-child(" + ubicacion + ")";
        $(col).hide();
    });

}
function colunasAMostrar(arrayColunas) {
    arrayColunas.map(function (ubicacion) {
        var col = "td:nth-child(" + ubicacion + "),th:nth-child(" + ubicacion + ")";
        $(col).show();
    });

}
