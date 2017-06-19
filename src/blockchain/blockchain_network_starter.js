module.exports = function(enrollObj, g_options, bo, logger) {
    var scm_chaincode = {};

    scm_chaincode.create_product = function(options) {
        return new Promise(function(resolve, reject) {
            var opts = {
                channel_id: g_options.channel_id,
                chaincode_id: g_options.chaincode_id,
                chaincode_version: g_options.chaincode_version,
                event_url: g_options.event_url,
                endorsed_hook: options.endorsed_hook,
                ordered_hook: options.ordered_hook,
                cc_function: 'createProduct',
                cc_args: [
                    options.args.id,
                    options.args.item,
                    options.args.distributor
                ],
                peer_tls_opts: g_options.peer_tls_opts,
            };
            bo.invoke_chaincode(enrollObj, opts)
                .then(function(resp) {
                    console.log("resp.body", resp);
                    return resolve({ statusCode: '200', body: resp.body });
                })
        });
    };


    scm_chaincode.get_product = function(options) {
        return new Promise(function(resolve, reject) {
            console.log('');
            var opts = {
                channel_id: g_options.channel_id,
                chaincode_id: g_options.chaincode_id,
                chaincode_version: g_options.chaincode_version,
                event_url: g_options.event_url,
                endorsed_hook: options.endorsed_hook,
                ordered_hook: options.ordered_hook,
                cc_function: 'getProduct',
                cc_args: [
                    options.args.id,
                ],
                peer_tls_opts: g_options.peer_tls_opts,
            };
            bo.query_chaincode(enrollObj, opts)
                .then(function(resp) {
                    return resolve({ statusCode: '200', body: resp.body });
                })

        });
    };

    scm_chaincode.delete_product = function(options) {
        return new Promise(function(resolve, reject) {
            console.log('');
            var opts = {
                channel_id: g_options.channel_id,
                chaincode_id: g_options.chaincode_id,
                chaincode_version: g_options.chaincode_version,
                event_url: g_options.event_url,
                endorsed_hook: options.endorsed_hook,
                ordered_hook: options.ordered_hook,
                cc_function: 'deleteProduct',
                cc_args: [
                    options.args.id,
                ],
                peer_tls_opts: g_options.peer_tls_opts,
            };
            bo.invoke_chaincode(enrollObj, opts)
                .then(function(resp) {
                    console.log("resp.body", resp.body);
                    return resolve({ statusCode: '200', body: resp.body });
                })

        });

    };
    return scm_chaincode;
};