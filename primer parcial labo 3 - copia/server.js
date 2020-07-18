const express = require('express');
const app = express();
const cors = require('cors');
const parser = require('body-parser');
//var Anuncios = require('./data/data.json');
var db = require('./data_access.js');
var puerto = 3000;
var todoOk;

app.use(cors());

app.use(express.static(__dirname + '/public'));

// Express 4.0
app.use(parser.json({ limit: '20mb' }));
app.use(parser.urlencoded({ extended: true, limit: '20mb' }));

//--------------Traer Anuncios-----------------------------------

function sendResponse(response, message, data) {
  response.send({ "message": message, "data": data });
}

app.get("/traer", function (request, response) {
  console.log("Enviando datos");
  db.get(sendResponse, response);
});

//------------Alta----------------------------------------

app.post('/alta', (request, response) => {
  console.log("Agregando objeto");
  db.insert(sendResponse, response, request.body);
});

//----------Baja--------------------------------------------

app.post('/baja', (request, response) => {
  console.log("Eliminando objeto");
  db.delete(sendResponse, response, request.body.id);

});

//-----------------Modificar-------------------------------

app.post('/modificar', (request, response) => {
  console.log("Modificando objeto");
  db.update(sendResponse, response, request.body);
});

//-----------------------------------------------------------------

const server = app.listen(puerto, () => {
  console.log('Servidor web iniciado en el puerto ' + puerto);
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', function (req, res) {
  res.sendFile(__dirname + '/public/admin.html');
});



