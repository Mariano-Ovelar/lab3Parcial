import { Anuncio } from "./Anuncio.js"

export class Anuncio_Mascota extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, animal, raza, fecha_nacimiento, vacuna, pais,metodo_de_pago) {
        super(id, titulo, transaccion, descripcion, precio)
        this.animal = animal;
        this.raza = raza;
        this.fecha_nacimiento = fecha_nacimiento;
        this.vacuna = vacuna;
        this.pais = pais;
        this.metodo_de_pago = metodo_de_pago;
    }

}