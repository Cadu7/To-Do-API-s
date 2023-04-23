import {UserData} from "../model/UserData";
import {checkIsEmail, checkIsEmpty, checkIsNull, validateField} from "../utils/Validator";
import {container} from "tsyringe";
import {UserRepository} from "../repository/UserRepository";
import {log} from "../config/Log";
import {InvalidRequest} from "../exception/InvalidRequest";
import {messages} from "../exception/messages/Messages";

export class UserService {
  async create(user: UserData) {

    validateField(user.name, "name", checkIsNull, checkIsEmpty)
    validateField(user.email, "email", checkIsNull, checkIsEmpty, checkIsEmail)
    validateField(user.password, "password", checkIsNull, checkIsEmpty)

    if (user.password.length < 12){
      throw new InvalidRequest(messages.INVALID_OBJECT, messages.PASSWORD_TOO_SHORT)
    }

    await container.resolve(UserRepository).checkIfAlreadyExist(user.email);

    log.info(`Creating new user for application`)
    await container.resolve(UserRepository).createNewUser(user);
    log.info(`The user was successfully created`)
  }
}