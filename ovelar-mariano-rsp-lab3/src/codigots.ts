


enum Vacuna {
    Si = "Si",
    No = "No",
}


window.addEventListener("load", function () {
    let sltVacuna = document.getElementById("sltVacuna");



    for (let item in Vacuna) {
        let opcion = document.createElement("option");
        opcion.value = item;
        opcion.textContent = item;
        sltVacuna?.appendChild(opcion);

    }

});



