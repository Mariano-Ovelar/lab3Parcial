


enum Evacuna {
    Si = "Si",
    No = "No",
}

enum Eanimal {
    todo = "MOSTRAR TODO",
    perro = "PERRO",
    gato = "GATO",
}


window.addEventListener("load", function () {
    let sltVacuna = document.getElementById("sltVacuna");
    let sltFiltrar = document.getElementById("sltFiltrar");

    for (let item in Evacuna) {
        let opcion = document.createElement("option");
        opcion.value = item;
        opcion.textContent = item;
        sltVacuna?.appendChild(opcion);

    }
    for (let item in Eanimal) {
        let opcion = document.createElement("option");
        opcion.value = item;
        opcion.textContent = item;
        sltFiltrar?.appendChild(opcion);

    }


});



