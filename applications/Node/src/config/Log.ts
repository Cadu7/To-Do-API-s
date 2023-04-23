import {createLogger, format, transports} from "winston"

const {timestamp, combine, colorize, printf} = format;

export const log = createLogger({
    level: 'info',
    transports: new transports.Console({
        format: combine(
            colorize({all: false, level: true, colors: {info: 'green', error: 'red', debug: "blue"}}),
            timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        )
    })
});