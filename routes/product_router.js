'use strict';

/*******************************************************************************
 * Copyright (c) 2017 IBM Corp.
 *
 * All rights reserved. 
 *
 *******************************************************************************/
var express = require('express');
var router = express.Router();
var productApi = require('../src/api/product_api.js');

router.route('/createProduct').post(function(req, res) {
    var data = req.body;
    productApi.createProduct(data)
        .then(function(resp) {
            res.send({ statusCode: '200', body: resp.body });
        })
});

router.route('/getProduct').post(function(req, res) {
    var data = req.body;
    productApi.getProduct(data)
        .then(function(resp) {
            res.send(resp.body);
        })
});

router.route('/deleteProduct').post(function(req, res) {
    var data = req.body;
    productApi.deleteProduct(data, res)
        .then(function(resp) {
            res.send({ statusCode: '200', body: resp.body });
        })
});

module.exports = router;