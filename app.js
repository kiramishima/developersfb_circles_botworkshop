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