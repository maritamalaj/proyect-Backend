import winston from "winston";
import config from "./config/config.js";

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error:1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "orange",
        warning: "yellow", 
        info: "blue",
        http: "green",
        debug: "white"
    }
}

const logger = winston.createLogger({
        levels: customLevelsOptions.levels,
        transports: [
            new winston.transports.Console({
                level: config.ENVIRONMENT ==  'development' ? 'debug' : 'info',
                format: winston.format.combine(/* winston.format.colorize(),  */winston.format.simple())
            }),
            new winston.transports.File({
                filename: './errors.log', 
                level: 'error',
                format: winston.format.simple()
            })
        ]
    });

export const addLogger = (req,res,next) => {
    req.logger = logger
    next()
}