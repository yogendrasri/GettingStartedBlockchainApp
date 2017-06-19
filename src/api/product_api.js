var path = require('path');
var Promise = require('bluebird');

module.exports = {
    ws_server: ws_server,
    setup: setup,
    createProduct: createProduct,
    getProduct: getProduct,
    deleteProduct: deleteProduct
}

var logger = require('../logging/logging.js').getLogger();
var bo = require('../blockchain/blockchain_operations.js')(logger);
var helper = require('../../utils/helper.js')(process.env.creds_filename, logger);
var ws_server = {};
var bns = null;
var enrollInterval = null;
var options = null;


function setup() {
    var enroll_options = helper.makeEnrollmentOptions(0);
    bo.enroll(enroll_options, function(errCode, enrollObj) {

        if (errCode != null) {
            logger.error('could not enroll');
        } else {

            var opts = helper.makeStarterAppLibOptions();
            bns = require('../../src/blockchain/blockchain_network_starter.js')(enrollObj, opts, bo, logger);


            /* enrollInterval = setInterval(function() { //to avoid REQUEST_TIMEOUT errors we periodically re-enroll
                 bo.enroll(enroll_options, function(err, enrollObj2) { //think of it as a keep alive, but... not 
                     if (err == null) {
                         bns = require('../../src/blockchain/blockchain_network_starter.js')(enrollObj2, opts, bo, logger);
                     }
                 });
             }, helper.getKeepAliveMs()); */ //timeout happens at 5 minutes, so this interval should be faster than that
        }
    });
};

options = {
    peer_urls: [helper.getPeersUrl(0)],
};

function createProduct(data) {
    return new Promise(function(resolve, reject) {
        try {
            options.args = {
                id: data.id,
                item: data.item,
                distributor: data.distributor
            };
            bns.create_product(options)
                .then(function(resp) {
                    console.log("resp.body", resp);
                    return resolve(resp)
                })

        } catch (err) {

            //reject({ statusCode: '500', body: 'error in creating product' });

        }

    });
}

function getProduct(data) {
    return new Promise(function(resolve, reject) {
        options.args = {
            id: data.id,
        };
        bns.get_product(options)
            .then(function(resp) {
                return resolve({ statusCode: '200', body: resp.body })
            })
    });
}

function deleteProduct(data) {
    return new Promise(function(resolve, reject) {
        options.args = {
            id: data.id,
        };
        bns.delete_product(options)
            .then(function(resp) {
                console.log("resp.body", resp.body);
                return resolve({ statusCode: '200', body: resp.body })
            })
    });
}