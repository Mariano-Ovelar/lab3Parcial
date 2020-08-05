//const { contains } = require("jquery");


function lSGuardar(datoAGuardar, key) {
    if (datoAGuardar != null && key != '') {
        /* var obj = {};
        obj["id"] = 1;
        obj["nombre"] = "juan"; */
        localStorage.setItem(key, JSON.stringify(datoAGuardar));
    }
}

function lSTraer(key) {
    var retorno = [];
    if (key != "") {
        if (localStorage.getItem(key)) {

            retorno = localStorage.getItem(key);
            retorno = JSON.parse(retorno);
        }
    }
    return retorno;
}

function lSGuardarNuevoElemento(datoAGuardar, key) {
    var lista;
    var siguiente;
    if (datoAGuardar != null && key != '') {
        lista = lSTraer(key);
        if (lista == null || lista == "") {
            lista = Array();
            siguiente = 1;
            datoAGuardar.id = siguiente;

            lista.push(datoAGuardar);
            lSGuardar(lista, key);
        } else {
            siguiente = lista.length + 1;
            datoAGuardar.id = siguiente;
            lista.push(datoAGuardar);
            lSGuardar(lista, key);
        }
    }

}
function lSBorrarElemento(datoABorrar, key) {

    let lista = lSTraer(key);
    let listaFiltrada;
    if (lista != null) {
        listaFiltrada = lista.filter(function (anuncio) {
            if (anuncio.id != datoABorrar.id) {
                return anuncio;
            }
        });
        lSGuardar(listaFiltrada, key);
    }
    else {
        console.log("no hay elementos en la lista!!!!")
    }
}

/* function lSMostrarColumnasActivas(key) {
    let columnas = lSTraer(key);
    if (lista != null) {
        colunasAMostrar(columnas);
    }
} */



/*
export { lSGuardarNuevoElemento, lSInicializarTabla, lSTraer, lSGuardar }

*/


