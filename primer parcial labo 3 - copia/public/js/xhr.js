


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

export { Manejador_Server };