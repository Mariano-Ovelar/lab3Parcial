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
    var ultimoId = lSTraer("ultimoId");
    if (datoAGuardar != null && key != '') {
        lista = lSTraer(key);
        if (lista == null || lista == "" && ultimoId == 0) {
            lista = Array();
            siguiente = 1;
            datoAGuardar.id = siguiente;
            lSGuardar(siguiente, "ultimoId");
            lista.push(datoAGuardar);
            lSGuardar(lista, key);
        } else {
            siguiente = ultimoId + 1;
            datoAGuardar.id = siguiente;
            lista.push(datoAGuardar);
            lSGuardar(lista, key);
            lSGuardar(siguiente, "ultimoId");
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

function lSModificarElemento(datoModificado, key) {

    let lista = lSTraer(key);
    let listaModificada;
    if (lista != null) {
        listaModificada = lista.map(function (elemento) {
            if (elemento.id == datoModificado.id) {
                elemento = datoModificado;
            }
            return elemento;
        });
        lSGuardar(listaModificada, key);
    }
    else {
        console.log("no hay elementos en la lista!!!!")
    }
}



