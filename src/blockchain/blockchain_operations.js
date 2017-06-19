//-------------------------------------------------------------------
// Invoke Chaincode - edit the ledger
//-------------------------------------------------------------------
var path = require('path');

module.exports = function(logger) {

    var EventHub = require('fabric-client/lib/EventHub.js');
    var utils = require('fabric-client/lib/utils.js');
    var invokestartapp_cc = {};
    var HFC = require('fabric-client');
    var path = require('path');
    var enrollment = {};
    var User = require('fabric-client/lib/User.js');
    var CaService = require('fabric-ca-client/lib/FabricCAClientImpl.js');
    var Orderer = require('fabric-client/lib/Orderer.js');
    var Peer = require('fabric-client/lib/Peer.js');
    var os = require('os');


    invokestartapp_cc.invoke_chaincode = function(obj, options) {
        return new Promise(function(resolve, reject) {
            logger.debug('Invoking Chaincode: ' + options.cc_function + '()');
            var eventhub;
            var chain = obj.chain;
            var nonce = utils.getNonce();
            var cbCalled = false;
            var request = {
                chainId: options.channel_id,
                chaincodeId: options.chaincode_id,
                chaincodeVersion: options.chaincode_version,
                fcn: options.cc_function,
                args: options.cc_args,
                txId: chain.buildTransactionID(nonce, obj.submitter),
                nonce: nonce,
            };
            logger.debug('Sending invoke req', request);
            if (options.event_url) {
                logger.debug('listening to event url', options.event_url);
                eventhub = new EventHub();
                eventhub.setPeerAddr(options.event_url, {
                    pem: options.peer_tls_opts.pem,
                    'ssl-target-name-override': options.peer_tls_opts.common_name
                });
                eventhub.connect();
            } else {
                logger.debug('will not use tx event');
            }
            chain.sendTransactionProposal(request)
                .then(function(results) {
                    var proposalResponses = results[0];
                    var proposal = results[1];
                    var header = results[2];
                    if (proposalResponses[0].response.status !== 200) {
                        logger.error(' Failed to obtain endorsement for transaction.', proposalResponses);
                    } else {
                        logger.debug('Successfully obtained transaction endorsement');
                        var request = {
                            proposalResponses: proposalResponses,
                            proposal: proposal,
                            header: header
                        };
                    }
                    chain.sendTransaction(request)
                        .then(function(response) {
                            console.log("Response", response.status);
                            if (response.status == 'SUCCESS') {
                                return resolve({ statusCode: '200', body: 'Successfully committed transaction' });
                            } else {
                                return reject({ statusCode: '500', body: 'Failed to commit transaction' })
                            }

                        })
                })
        });
    };

    invokestartapp_cc.query_chaincode = function(obj, options) {
        return new Promise(function(resolve, reject) {
            logger.debug('Querying Chaincode: ' + options.cc_function + '()');
            var chain = obj.chain;
            var nonce = utils.getNonce();
            var request = {
                chainId: options.channel_id,
                chaincodeId: options.chaincode_id,
                chaincodeVersion: options.chaincode_version,
                fcn: options.cc_function,
                args: options.cc_args,
                txId: chain.buildTransactionID(nonce, obj.submitter),
                nonce: nonce,
            };

            chain.queryByChaincode(request)
                .then(function(response) {
                    console.log("Response", JSON.parse(response));
                    //if (response)
                    return resolve({ statusCode: '200', body: JSON.parse(response) });
                })

        });
    };

    invokestartapp_cc.enroll = function(options, cb) {
        var chain = {};
        var client = null;

        client = new HFC();
        chain = client.newChain(options.channel_id);
        if (!options.uuid) {
            if (cb) cb({ error: 'cannot enroll with undefined uuid' });
            return;
        }
        HFC.newDefaultKeyValueStore({
            path: path.join(os.homedir(), '.hfc-key-store/' + options.uuid)
        }).then(function(store) {
            client.setStateStore(store);
            return getSubmitter(client, options);
        }).then(function(submitter) {
            chain.addOrderer(new Orderer(options.orderer_url, {
                pem: options.orderer_tls_opts.pem,
                'ssl-target-name-override': options.orderer_tls_opts.common_name
            }));

            for (var i in options.peer_urls) {
                chain.addPeer(new Peer(options.peer_urls[i], {
                    pem: options.peer_tls_opts.pem,
                    'ssl-target-name-override': options.peer_tls_opts.common_name
                }));
            }
            try {
                chain.setPrimaryPeer(new Peer(options.peer_urls[0], {
                    pem: options.peer_tls_opts.pem,
                    'ssl-target-name-override': options.peer_tls_opts.common_name
                }));
                logger.debug('added primary peer', options.peer_urls[0]);
            } catch (e) {}
            if (cb) cb(null, { chain: chain, submitter: submitter });
            return;
        })
    };


    function getSubmitter(client, options) {
        var member;
        return client.getUserContext(options.enroll_id).then((user) => {
            if (user && user.isEnrolled()) {
                logger.info('Successfully loaded member from persistence');
                return user;
            } else {
                var tlsOptions = {
                    trustedRoots: [options.ca_tls_opts.pem],
                    verify: false
                };
                var ca_client = new CaService(options.ca_url, tlsOptions)
                return ca_client.enroll({
                    enrollmentID: options.enroll_id,
                    enrollmentSecret: options.enroll_secret
                }).then((enrollment) => {
                    logger.info('Successfully enrolled user \'' + options.enroll_id + '\'');
                    member = new User(options.enroll_id, client);
                    return member.setEnrollment(enrollment.key, enrollment.certificate, options.msp_id);
                }).then(() => {
                    return client.setUserContext(member);
                }).then(() => {
                    return member;
                }).catch((err) => {
                    logger.error('Failed to enroll and persist user. Error: ' + err.stack ? err.stack : err);
                    throw new Error('Failed to obtain an enrolled user');
                });
            }
        });
    }

    return invokestartapp_cc;
};