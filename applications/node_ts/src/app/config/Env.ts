import "dotenv/config";
import {EnvType} from "./EnvType";

const secret: string | undefined = process.env.SECURITY_SECRET

if (!secret) {
  throw Error("The secret must be set in .env")
}

let language: string | undefined = process.env.LANGUAGE;
if (!language || !["PT","EN"].includes(language)){
    throw Error("The language must be set in .env and must be PT or EN")
}

export const env: EnvType = {
  application: {
    language: language,
    port: 8080,
    emailRegex: new RegExp("^[\\w-\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
    cors: {
      methods: "POST, GET, PATCH, DELETE",
      origin: [
        "http://localhost:8080",
        "localhost:8080"
      ]
    },
    security: {
      secret: secret,
      expireIn: process.env.SECURITY_EXPIRE_IN || "1h"
    }
  }
}