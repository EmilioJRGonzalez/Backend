const winston = require ('winston')
const CONFIG = require('./config')

// Seteo de opciones
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'magenta',
        info: 'blue',
        http: 'cyan',
        debug: 'grey',
    }
}


winston.addColors(customLevelsOptions.colors)

// configuracion 
const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    // Declaramos el transport
    transports: [
        new winston.transports.Console(
            {
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './erros.log',
                level: "debug",
                format: winston.format.simple()
            }
        )
    ]
})


const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    // Declaramos el transport
    transports: [
        new winston.transports.Console(
            {
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './erros.log',
                level: "info",
                format: winston.format.simple()
            }
        )
    ]
})


// creamos el middlware
module.exports.addLogger = (req, res, next) => {

    if (CONFIG.ENVIRONMENT === "production") {
        req.logger = prodLogger;
        req.logger.info(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    } else {
        req.logger = devLogger;
        req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    }
    next();
}
