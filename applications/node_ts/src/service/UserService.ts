import {UserData} from "../model/UserData";
import {checkIsEmail, checkIsEmpty, checkIsNull, validateField} from "../utils/Validator";
import {container} from "tsyringe";
import {UserRepository} from "../repository/UserRepository";
import {log} from "../config/Log";
import {InvalidRequestException} from "../exception/InvalidRequestException";
import {messages} from "../exception/messages/Messages";
import {SecurityService} from "./SecurityService";
import {User} from "@prisma/client";

export class UserService {
  async create(user: UserData) {

    validateField(user.name, "name", checkIsNull, checkIsEmpty)
    validateField(user.email, "email", checkIsNull, checkIsEmpty, checkIsEmail)
    validateField(user.password, "password", checkIsNull, checkIsEmpty)

    if (user.password.length < 12) {
      throw new InvalidRequestException(messages.INVALID_OBJECT, messages.PASSWORD_TOO_SHORT)
    }

    await container.resolve(UserRepository).checkIfAlreadyExist(user.email);

    user.password = await container.resolve(SecurityService).encryptPassword(user.password);

    log.info(`Creating new user for application`)
    await container.resolve(UserRepository).createNewUser(user);
    log.info(`The user was successfully created`)
  }

  findUserByUserName(username: string): Promise<User | void | null> {
    return container.resolve(UserRepository).findByEmail(username);
  }
}