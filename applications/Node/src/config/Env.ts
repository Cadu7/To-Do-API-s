import {config} from "dotenv";
import {EnvType} from "./EnvType";

config()

export const env: EnvType = {
  config:{
    emailRegex: new RegExp("^[\\w-\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
  },
  application: {
    language: process.env.LANGUAGE || "EN",
    port: Number(process.env.PORT) || 8080,
    cors: {
      methods: "POST, GET, PATCH, DELETE",
      origin: [
        "http://localhost:8080",
        "localhost:8080"
      ]
    }
  }
}