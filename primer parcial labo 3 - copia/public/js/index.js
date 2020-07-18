import { Anuncio_Mascota } from "./Anuncio_Mascota.js"
import { Manejador_Server } from "./xhr.js"
import { crearTabla, estiloTabla } from "./tableheper.js"

let form;
let btnGuardar;
let btnBorrar;
let btnModificar;
let btnCancelar;

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
let grupoDeBotonesForm;

window.addEventListener("load", function () {
    form = document.forms[0];

    btnGuardar = document.getElementById("btnGuardar");
    btnBorrar = document.getElementById("btnBorrar");
    btnModificar = document.getElementById("btnEditar");
    btnCancelar = document.getElementById("btnCancelar");
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
    botonesVisivilidad(grupoDeBotonesForm, [btnGuardar]);
    btnGuardar.addEventListener("click", function () {
        alta(crearElemento(form));
    });

    btnBorrar.addEventListener("click", function () {
        baja(crearElemento(form))
    });

    btnModificar.addEventListener("click", function () {
        modificar(crearElemento(form))
    });
    btnCancelar.addEventListener("click", function () {
        cancelar()
    });
    Listar();
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
    var metodo_de_pago = [];

    for (var elemento of form.elements) {
        switch (elemento.name) {
            case "titulo":
                titulo = elemento.value;
                break;
            case "descripcion":
                descripcion = elemento.value;
                break;
            case "animal":
                if (elemento.checked) {
                    animal = elemento.value
                }
                break;
            case "precio":
                precio = elemento.value;
                break;
            case "raza":
                raza = elemento.value;
                break;
            case "fecha_nacimiento":
                fecha_nacimiento = elemento.value;
                break;
            case "vacuna":
                vacuna = elemento.value;
                break;
            case "tarjeta":
                if (elemento.checked) {
                    metodo_de_pago.push(elemento.value);
                }
                break;
            case "efectivo":
                if (elemento.checked) {
                    metodo_de_pago.push(elemento.value);
                }
                break;
            default:
                break;
        }
    }

    transaccion = "venta";
    id=idOculto.value;
    var anuncio = new Anuncio_Mascota(id, titulo, transaccion, descripcion, precio, animal, raza, fecha_nacimiento, vacuna, metodo_de_pago);

    return anuncio;
}
function Listar() {
    tabla.innerText = "";
    tabla.appendChild(Spinner());
    fetch('/traer')
        .then(res => {
            res.json()
                .then(res => {
                    tabla.innerText = "";
                    tabla.appendChild(crearTabla(res.data));
                    let td = document.getElementsByTagName('td');
                    estiloTabla();
                    for (let i = 0; i < td.length; i++) {

                        td[i].addEventListener('click', function (e) {
                            let tr = e.target.parentElement;
                            let nodes = tr.childNodes;
                            console.log(nodes);
                            let anuncio = new Anuncio_Mascota(nodes[0].textContent, nodes[1].textContent, nodes[2].textContent
                                , nodes[3].textContent, nodes[4].textContent, nodes[5].textContent, nodes[6].textContent
                                , nodes[7].textContent, nodes[8].textContent, nodes[9].textContent.split(","));
                            CargarFormulario(anuncio);
                        });
                    }
                });

        });
}

function CargarFormulario(obj) {
    botonesVisivilidad([btnGuardar], grupoDeBotonesForm);
    ckbTarjeta.checked = false;
        ckbEfectivo.checked = false;
    txtTitulo.value = obj.titulo;
    txtDescripcion.value = obj.descripcion;
    if (obj.animal == "perro") {
        rdbPerro.checked = true;
    }
    else {
        rdbGato.checked = true;
    }

    if (obj.metodo_de_pago[0] == "tarjeta") {
        ckbTarjeta.checked = true;
        ckbEfectivo.checked = false;
        if (obj.metodo_de_pago[1] == "efectivo") {
            ckbEfectivo.checked = true;
        }
    }
    else if (obj.metodo_de_pago[0] == "efectivo") {
        ckbEfectivo.checked = true;
        ckbTarjeta.checked = false;
    }

    txtPrecio.value = obj.precio;
    txtRaza.value = obj.raza;
    dtFecha.value = obj.fecha_nacimiento;
    sltVacuna.value = obj.vacuna;
    idOculto.value = obj.id;
}

function Spinner() {
    var spinner = document.createElement('img');
    spinner.setAttribute('src', './img/loading.gif');
    spinner.setAttribute('alt', 'spinner');
    return spinner;
}

function botonesVisivilidad(aOcultar, aMostrar) {
    for (var index = 0; index < aOcultar.length; index++) {
        aOcultar[index].setAttribute('style', 'visibility: hidden');
    }
    for (var index = 0; index < aMostrar.length; index++) {
        const element = aMostrar[index].setAttribute('style', 'visibility: visible');

    }

}

function borrarForm() {
    txtTitulo.value = "";
    txtDescripcion.value = "";
    rdbPerro.checked = true;
    txtPrecio.value = "";
    txtRaza.value = "";
    dtFecha.value = "";
    sltVacuna.value = "Si";
    idOculto.value = "";
    ckbTarjeta.checked = false;
    ckbEfectivo.checked = false;
}


function alta(obj) {
    if (alerta("Quiere agregar el nuevo anuncio a la lista?")) {
        btnGuardar.disabled = true;
        Manejador_Server(obj, "Alta Exitosa", '/alta');
        Listar();
        btnGuardar.disabled = false;
    }
}

function baja(obj) {
    if (alerta("Quiere borrar el anuncio de la lista?")) {
        botonesVisivilidad(grupoDeBotonesForm, [btnGuardar]);
        Manejador_Server(obj, "Baja Exitosa", '/baja');
        Listar();
    }

}

function modificar(obj) {
    if (alerta("Quiere guardar cambios de el anuncio?")) {
        botonesVisivilidad(grupoDeBotonesForm, [btnGuardar]);
        Manejador_Server(obj, "Modificacion Exitosa", '/modificar');
        Listar();
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
    alert(respuesta);
    return opcion;
}