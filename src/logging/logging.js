var winston = require('winston');

function getLogger() {

    var logger = new(winston.Logger)({
        level: 'debug',
        transports: [
            new(winston.transports.Console)({ colorize: true }),
        ]
    });

    return logger
}


module.exports = {
    getLogger: getLogger

}