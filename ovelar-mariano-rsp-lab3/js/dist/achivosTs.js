"use strict";
class Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}
/// <reference path="Anuncio.ts" />
class Anuncio_Mascota extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, animal, raza, fecha_nacimiento, vacuna) {
        super(id, titulo, transaccion, descripcion, precio);
        this.animal = animal;
        this.raza = raza;
        this.fecha_nacimiento = fecha_nacimiento;
        this.vacuna = vacuna;
    }
}
/* class DataAccess {
    
}  */
var Evacuna;
(function (Evacuna) {
    Evacuna["Si"] = "Si";
    Evacuna["No"] = "No";
})(Evacuna || (Evacuna = {}));
var Eanimal;
(function (Eanimal) {
    Eanimal["todo"] = "MOSTRAR TODO";
    Eanimal["perro"] = "PERRO";
    Eanimal["gato"] = "GATO";
})(Eanimal || (Eanimal = {}));
window.addEventListener("load", function () {
    let sltVacuna = document.getElementById("sltVacuna");
    let sltFiltrar = document.getElementById("sltFiltrar");
    for (let item in Evacuna) {
        let opcion = document.createElement("option");
        opcion.value = item;
        opcion.textContent = item;
        sltVacuna === null || sltVacuna === void 0 ? void 0 : sltVacuna.appendChild(opcion);
    }
    for (let item in Eanimal) {
        let opcion = document.createElement("option");
        opcion.value = item;
        opcion.textContent = item;
        sltFiltrar === null || sltFiltrar === void 0 ? void 0 : sltFiltrar.appendChild(opcion);
    }
});
class contadorClick {
    constructor(id, click) {
        this.id = id;
        this.click = click;
    }
}
//# sourceMappingURL=achivosTs.js.map