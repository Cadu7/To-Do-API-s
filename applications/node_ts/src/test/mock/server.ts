import request from "supertest";
import {app} from "../../app/web/Server";

export const apiServer = request(app)