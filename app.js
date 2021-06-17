var fs = require('fs');
var https = require('https');
var path = require('path');
var cors = require('cors');
var axios = require('axios');
var express = require('express');
var bodyParser = require('body-parser')
var dbCongif = require('./util/dbconfig')
var mysql = require('mysql')

const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const router = express.Router();
const port = 2333

const API = 'http://localhost:2333/'

app.use(express.static(__dirname + '/'));
app.use('/img', express.static('img'));


var login = require('./routes/login');
var board = require('./routes/board');
var init = require('./routes/init');
var album = require('./routes/album');

app.use('/api/login', login);
app.use('/api/board', board);
app.use('/api/init', init);
app.use('/api/album', album);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})