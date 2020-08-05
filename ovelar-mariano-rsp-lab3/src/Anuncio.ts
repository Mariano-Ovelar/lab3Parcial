 class Anuncio {
    id: number;
    titulo: string;
    transaccion: string;
    descripcion: string;
    precio: number;

    constructor(id: number, titulo: string, transaccion: string, descripcion: string, precio: number) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}