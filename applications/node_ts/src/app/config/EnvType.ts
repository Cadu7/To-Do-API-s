import {CorsOptions} from "cors";

export interface EnvType {
  application: {
    language: string,
    port: number,
    emailRegex: RegExp,
    cors: CorsOptions,
    security: {
      secret: string,
      expireIn: string | number
    }
  }
}