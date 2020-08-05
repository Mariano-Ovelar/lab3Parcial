
/// <reference path="../node_modules/@types/jquery/JQuery.d.ts"/>

function Manejador_Server(obj, mensaje, pedido) {

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) {

            if (xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);

                if (data.message == mensaje) {
                    console.log(mensaje);
                }
            }
            else {
                console.log(`Error:${xhr.status}-${xhr.statusText}`);
            }
        }
    }
    //abri la conexion con el servidor enviar o traer datos
    xhr.open('POST', pedido, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    //enviar la peticion
    xhr.send(JSON.stringify(obj));
}

function Manejador_ServerJQ(obj, mensaje, pedido) {

    $.ajax({
        type: 'POST',
        url: pedido,
        data: obj,
        dataType: "json"

    });
}


