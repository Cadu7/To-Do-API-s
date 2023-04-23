import {CorsOptions} from "cors";

export interface EnvType {
  config:{
    emailRegex: RegExp
  },
  application: {
    language: string,
    port: number,
    cors: CorsOptions
  }
}