import {checkIsEmpty, checkIsNull, validateField} from "../utils/Validator";
import {hash, compareSync} from "bcrypt";
import {container} from "tsyringe";
import {UserService} from "./UserService";
import {messages} from "../exception/messages/Messages";
import {AuthRequestException} from "../exception/AuthRequestException";
import {User} from "@prisma/client";
import {sign} from 'jsonwebtoken'
import {env} from "../config/Env";

const {security} = env.application

export class SecurityService {

  async login(username: string, password: string): Promise<string> {

    validateField(username, "username", checkIsNull, checkIsEmpty)
    validateField(password, "password", checkIsNull, checkIsEmpty)

    const user = await container.resolve(UserService).findUserByUserName(username);
    console.log({user})
    if (!user) {
      throw new AuthRequestException(messages.INVALID_OBJECT, messages.INCORRECT_USER_OR_PASSWORD);
    }

    if (!this.verifyPassword(password, user.password)) {
      throw new AuthRequestException(messages.INVALID_OBJECT, messages.INCORRECT_USER_OR_PASSWORD);
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): string {
    return sign(
      {email: user.email, name: user.name},
      security.secret,
      {issuer: "to-do-api-node", expiresIn: security.expireIn}
    )
  }

  encryptPassword(password: string): Promise<string> {
    return hash(password, 10)
  }

  verifyPassword(password: string, encrypted: string) {
    return compareSync(password, encrypted)
  }

}