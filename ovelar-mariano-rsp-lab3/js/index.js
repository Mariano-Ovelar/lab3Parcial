
//// <reference path="../node_modules/@types/jquery/JQuery.d.ts"/>


let form;

let tabla;
let txtTitulo;
let txtDescripcion;
let rdbPerro;
let rdbGato;
let ckbTarjeta;
let ckbEfectivo;
let txtPrecio;
let txtRaza;
let dtFecha;
let sltVacuna;
let idOculto;

let today;
let inputRequired;
let listaAnuncio;

let btnGuardar;
let btnBorrar;
let btnModificar;
let btnCancelar;
let grupoDeBotonesForm;

let checkTransaccion;
let checkTitulo;
let checkDescripcion;
let checkAnimal;
let checkPrecio;
let checkRaza;
let checkFecha;
let checkVuna;
let listaCheck;
let txtPromedio;
let sltFiltrar;

window.addEventListener("load", function () {
    form = document.forms[0];
    btnGuardar = document.getElementById("btnGuardar");
    btnCancelar = document.getElementById("btnCancelar");
    btnBorrar = document.getElementById("btnBorrar");
    btnModificar = document.getElementById("btnEditar");
    grupoDeBotonesForm = [btnBorrar, btnModificar, btnCancelar];
    tabla = document.getElementById("tabla");
    txtTitulo = document.getElementById("txtTitulo");
    txtDescripcion = document.getElementById("txtDescripcion");
    rdbPerro = document.getElementById("rdbPerro");
    rdbGato = document.getElementById("rdbGato");
    ckbTarjeta = document.getElementById("ckbTarjeta");
    ckbEfectivo = document.getElementById("ckbEfectivo");
    txtPrecio = document.getElementById("txtPrecio");
    txtRaza = document.getElementById("txtRaza");
    dtFecha = document.getElementById("dtFecha");
    sltVacuna = document.getElementById("sltVacuna");
    idOculto = document.getElementById("idOculto");
    inputRequired = [txtTitulo, txtDescripcion, txtPrecio, txtRaza];
    today = new Date().toISOString().split('T')[0];
    dtFecha.setAttribute('max', today);
    dtFecha.value = today;

    checkTitulo = document.getElementById("checkTitulo");
    checkTransaccion = document.getElementById("checkTransaccion");
    checkDescripcion = document.getElementById("checkDescripcion");
    checkAnimal = document.getElementById("checkAnimal");
    checkPrecio = document.getElementById("checkPrecio");
    checkRaza = document.getElementById("checkRaza");
    checkFecha = document.getElementById("checkFecha");
    checkVuna = document.getElementById("checkVuna");
    listaCheck = [checkTitulo, checkTransaccion, checkDescripcion, checkAnimal, checkPrecio, checkRaza, checkFecha, checkVuna];
    txtPromedio = document.getElementById("txtPromedio");
    sltFiltrar = document.getElementById("sltFiltrar");
    inicializarEventos();
    botonesVisivilidad(grupoDeBotonesForm, [btnGuardar]);
    refrecarTabla(lSTraer('listaAnuncios'));
    sacarPromedio(lSTraer("listaAnuncios"));
    instanciarCheck();
    //colunasAMostrar(lSTraer("checkActivos"));

});

function crearElemento(form) {
    var id;
    var titulo;
    var transaccion;
    var descripcion;
    var precio;
    var animal;
    var raza;
    var fecha_nacimiento;
    var vacuna;

    for (var elemento of form.elements) {
        switch (elemento.id) {
            case "txtTitulo":
                titulo = elemento.value;
                break;
            case "txtDescripcion":
                descripcion = elemento.value;
                break;
            case "rdbPerro":
                if (elemento.checked) {
                    animal = elemento.value
                }
                break;
            case "rdbGato":
                if (elemento.checked) {
                    animal = elemento.value
                }
                break;
            case "txtPrecio":
                precio = elemento.value * 1;
                break;
            case "txtRaza":
                raza = elemento.value;
                break;
            case "dtFecha":
                fecha_nacimiento = elemento.value;
                break;
            case "sltVacuna":
                vacuna = elemento.value;
                break;
            default:
                break;
        }
    }

    transaccion = "venta";
    id = idOculto.value;
    var anuncio = new Anuncio_Mascota(id, titulo, transaccion, descripcion, precio, animal, raza, fecha_nacimiento, vacuna);

    return anuncio;
}

function alta(obj) {
    if (alerta("Quiere agregar el nuevo anuncio a la lista?")) {
        lSGuardarNuevoElemento(obj, 'listaAnuncios');
        borrarForm();

    }
}

function baja(obj) {
    if (alerta("Quiere borrar el anuncio de la lista?")) {
        botonesVisivilidad(grupoDeBotonesForm, [btnGuardar]);
        lSBorrarElemento(obj, 'listaAnuncios');
        borrarForm();

    }
}

function modificar(obj) {
    if (alerta("Quiere guardar cambios de el anuncio?")) {
        botonesVisivilidad(grupoDeBotonesForm, [btnGuardar]);

        borrarForm();

    }
}

function cancelar() {
    if (alerta("Quiere cancelar la Edicion/Eliminacion del anuncio?")) {
        botonesVisivilidad(grupoDeBotonesForm, [btnGuardar]);
        borrarForm();

    }
}

function alerta(mensaje) {
    var respuesta;
    var opcion = confirm(mensaje);
    if (opcion == true) {
        respuesta = "Has clickado OK";
    } else {
        respuesta = "Has clickado Cancelar";
    }
    console.log(respuesta);
    return opcion;
}

function borrarForm() {
    txtTitulo.value = "";
    txtDescripcion.value = "";
    rdbPerro.checked = true;
    txtPrecio.value = "0";
    txtRaza.value = "";
    dtFecha.value = today;
    sltVacuna.value = "Si";
    idOculto.value = "";
    sltFiltrar.value = "todo";
    sacarPromedio(lSTraer("listaAnuncios"));
    refrecarTabla(lSTraer('listaAnuncios'));
    traerChekFrom();
}

function CargarFormulario(obj) {
    botonesVisivilidad([btnGuardar], grupoDeBotonesForm);
    txtTitulo.value = obj.titulo;
    txtDescripcion.value = obj.descripcion;
    if (obj.animal == "perro") {
        rdbPerro.checked = true;
    }
    else {
        rdbGato.checked = true;
    }

    txtPrecio.value = obj.precio;
    txtRaza.value = obj.raza;
    dtFecha.value = obj.fecha_nacimiento;
    sltVacuna.value = obj.vacuna;
    idOculto.value = obj.id;
}

function inicializarEventos() {
    btnGuardar = document.getElementById("btnGuardar");
    btnGuardar.addEventListener("click", function (e) {
        e.preventDefault();
        alta(crearElemento(form));
    });
    btnModificar = document.getElementById("btnEditar");
    btnModificar.addEventListener("click", function (e) {
        e.preventDefault();
        modificar(crearElemento(form));
    });
    btnBorrar = document.getElementById("btnBorrar");
    btnBorrar.addEventListener("click", function (e) {
        e.preventDefault();
        baja(crearElemento(form));
    });
    btnCancelar = document.getElementById("btnCancelar");
    btnCancelar.addEventListener("click", function (e) {
        e.preventDefault();
        cancelar();
    });
    idOculto = document.getElementById("idOculto");
    idOculto.classList.add("d-none");
    desactivarTxt(txtPromedio);

    sltFiltrar.addEventListener("click", function (e) {
        filtrarAnimal(sltFiltrar.value);
    });


}

function desactivarBoton(booton) {
    booton.disabled = true;
}
function desactivarTxt(txt) {
    txt.disabled = true;
}
function activarBoton(booton) {
    booton.disabled = false;
}

function botonesVisivilidad(aOcultar, aMostrar) {
    for (var index = 0; index < aOcultar.length; index++) {
        aOcultar[index].classList.add("d-none");;
    }
    for (var index = 0; index < aMostrar.length; index++) {
        const element = aMostrar[index].classList.remove("d-none");;

    }
}



function traerChekFrom() {

    let respuesta = Array();

    listaCheck.map(function (elemento) {
        if (elemento.checked == false) {
            respuesta.push(elemento.value);
            colunasAOcultar([elemento.value])
        } else {
            colunasAMostrar([elemento.value])
        }
    });

    return respuesta;
}

function checkEvento() {
    for (var elemento of listaCheck) {
        elemento.addEventListener("click", function () {
            lSGuardar(traerChekFrom(), "checkActivos");
        });
    }

}


function instanciarCheck() {
    var arrayLS = lSTraer("checkActivos");
    checkEvento();
    for (var elemento of listaCheck) {
        for (var valor of arrayLS) {
            if (valor == elemento.value) {
                elemento.checked = false;
                break;
            }
        }
    }
    colunasAOcultar(arrayLS);
}

function sacarPromedio(listaAnuncio) {
    var pro;
    let suma = 0;
    var i = listaAnuncio.length;
    if (i > 1) {
        suma = listaAnuncio.reduce(function (anterior, actual) {
            console.log(anterior);
            anterior = 0;
            return anterior + actual.precio;
        })
        console.log(suma);
        pro = suma / i;
        txtPromedio.value = pro;
    }
    else if (i == 1) {
        txtPromedio.value = listaAnuncio[0].precio;
    }
    else {
        txtPromedio.value = 0;
    }
}
function filtrarAnimal(tipoMascota) {
    var listaAnuncio = lSTraer("listaAnuncios");
    var listaFiltrada;
    if (tipoMascota != "todo") {
        listaFiltrada = listaAnuncio.filter(function (mascota) {
            return mascota.animal == tipoMascota;
        });
    } else {
        listaFiltrada = listaAnuncio;
    }
    sacarPromedio(listaFiltrada);
    refrecarTabla(listaFiltrada);
    traerChekFrom();
}