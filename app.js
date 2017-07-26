'use strict';

const 
  bodyParser = require('body-parser'),
  config = require('config'),
  express = require('express'),
  https = require('https'),  
  request = require('request'),
  swapi = require('swapi-node');

//Configuraciones generales del proyecto
var app = express();
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(express.static('public'));

//Se obtienen las constantes para conectar con webhook
const APP_SECRET = config.get('appSecret');
const VALIDATION_TOKEN =  config.get('validationToken');
const PAGE_ACCESS_TOKEN =  config.get('pageAccessToken'); 
const SERVER_URL =  config.get('serverURL');


// En caso de que no existan las constantes necesarias se termina la aplicación
if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN && SERVER_URL)) {
  console.error("Missing config values");
  process.exit(1);
}

app.get('/',function(req,res){
  res.send("ok");
  console.log("entra");
});

//Creamos webhook para validar la propiedad
app.get('/webhook',function(req,res){
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Error en validación");
    res.sendStatus(403);          
  }  
});



//Start app
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;