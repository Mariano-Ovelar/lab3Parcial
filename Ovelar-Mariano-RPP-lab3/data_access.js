(function () {
    function getID(array) {
        if (array.length == 0) {
            return 1;
        }
        else if (array.length == 1) {
            return 2;
        }
        else {
            var maxIndex = array.reduce(function (prev, curr, index) {
                if (parseInt(prev.id) > parseInt(curr.id))
                    return parseInt(prev.id);
                else
                    return parseInt(curr.id);
            });
            return (maxIndex + 1).toString();
        }
    }
    function remove(a) {
        a.active = "false";
    }
    let dbObject = {
        log: function () {
            console.log("Logueo mensaje");
        },
        get: function (cb, response) {
            let array;
            require('fs').readFile(__dirname + '\\data\\data.json', 'utf8', function (err, data) {
                if (err) {
                    throw err;
                }
                else if (data === undefined) {
                    throw ("No se encontro la data solicitada");
                }
                array = JSON.parse(data);
                array = array.filter(function (a) {
                    return a.active == true || a.active == "true";
                });
                array.forEach(element => {
                    delete element.active;
                });
                setTimeout(function () { cb(response, "Carga Exitosa", array) }, 5000);
            });

            //return array;
        },
        insert: function (cb, response, nuevoObjeto) {
            require('fs').readFile(__dirname + '\\data\\data.json', 'utf8', function (err, data) {
                if (err) {
                    throw err; // error handling
                } else {
                    //guardo el objeto
                    let array = [];
                    array = JSON.parse(data);
                    let id = getID(array);
                    nuevoObjeto.id = id;

                    nuevoObjeto.active = "true";

                    array.push(nuevoObjeto);
                    require('fs').writeFileSync(__dirname + '\\data\\data.json', JSON.stringify(array));

                    setTimeout(function () { cb(response, "Alta Exitosa") }, 5000);
                }
            });
        },
        delete: function (cb, response, id) {
            let array;
            require('fs').readFile(__dirname + '\\data\\data.json', 'utf8', function (err, data) {
                if (err) {
                    // error handling
                }
                array = JSON.parse(data);
                var objectToDelete = array.filter(function (a) {
                    return a.id == id;
                });
                remove(objectToDelete[0]);
                require('fs').writeFileSync(__dirname + '\\data\\data.json', JSON.stringify(array));
                setTimeout(function () { cb(response, "Baja Exitosa") }, 5000);
            });
        },
        update: function (cb, response, nuevoObjeto) {
            nuevoObjeto.active = "true";

            var array = new Array();
            require('fs').readFile(__dirname + '\\data\\data.json', 'utf8', function (err, data) {
                if (err) {
                    // error handling
                }
                array = JSON.parse(data);
                //obtengo index del id que necesito
                var index = array.findIndex(function (obj) { return obj.id === nuevoObjeto.id || obj.id.toString() === nuevoObjeto.id; })
                array[index] = nuevoObjeto;

                require('fs').writeFileSync(__dirname + '\\data\\data.json', JSON.stringify(array));
                setTimeout(function () { cb(response, "Modificacion Exitosa") }, 5000);
            });
            
        }
    }
    module.exports = dbObject;

}());