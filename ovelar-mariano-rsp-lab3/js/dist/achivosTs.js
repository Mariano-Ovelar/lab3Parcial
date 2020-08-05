"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Anuncio = /** @class */ (function () {
    function Anuncio(id, titulo, transaccion, descripcion, precio) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    return Anuncio;
}());
/// <reference path="Anuncio.ts" />
var Anuncio_Mascota = /** @class */ (function (_super) {
    __extends(Anuncio_Mascota, _super);
    function Anuncio_Mascota(id, titulo, transaccion, descripcion, precio, animal, raza, fecha_nacimiento, vacuna) {
        var _this = _super.call(this, id, titulo, transaccion, descripcion, precio) || this;
        _this.animal = animal;
        _this.raza = raza;
        _this.fecha_nacimiento = fecha_nacimiento;
        _this.vacuna = vacuna;
        return _this;
    }
    return Anuncio_Mascota;
}(Anuncio));
var Vacuna;
(function (Vacuna) {
    Vacuna["Si"] = "Si";
    Vacuna["No"] = "No";
})(Vacuna || (Vacuna = {}));
window.addEventListener("load", function () {
    var sltVacuna = document.getElementById("sltVacuna");
    for (var item in Vacuna) {
        var opcion = document.createElement("option");
        opcion.value = item;
        opcion.textContent = item;
        sltVacuna === null || sltVacuna === void 0 ? void 0 : sltVacuna.appendChild(opcion);
    }
});
//# sourceMappingURL=achivosTs.js.map