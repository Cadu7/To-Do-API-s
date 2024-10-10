import {env} from '../config/Env';
import "reflect-metadata"
import "express-async-errors"
import express, {json} from 'express';
import cors from 'cors'
import {log} from "../config/Log";
import {routes} from "./routes/Routes";
import {exceptionHandler} from "../exception/ExceptionHandler";

export const app = express();

app.use(cors(env.application.cors))
app.use(json());
app.use(routes)
app.use(exceptionHandler)

if (process.env.NODE_ENV != 'test') {
    app.listen(env.application.port, () => log.info(`Starting the application on port ${env.application.port}`))
}