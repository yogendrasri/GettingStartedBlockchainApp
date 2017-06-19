'use strict';
/*******************************************************************************
 * Copyright (c) 2017 IBM Corp.
 *
 * All rights reserved.
 *
 *******************************************************************************/
var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require("body-parser");
var logger = require('./src/logging/logging.js').getLogger();
var helper = require(__dirname + '/utils/helper.js')(process.env.creds_filename, logger);
var fcw = require('./src/blockchain/blockchain_operations.js')(logger);
var ws_server = require('./src/api/product_api.js');

var host = 'localhost';
var port = helper.getStarterAppPort();

if (process.env.VCAP_APPLICATION) {
    host = '0.0.0.0';
    port = process.env.PORT;
}

var server = http.createServer(app).listen(port, function() {});
process.env.NODE_ENV = 'production';
console.log('******* Server started on' + host + ':' + port + '************');
ws_server.setup();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', require('./routes/product_router'));
app.use(express.static(__dirname + '/public'));