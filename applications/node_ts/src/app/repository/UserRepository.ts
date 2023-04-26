import {user} from "./Prima";
import {User} from "@prisma/client"
import {InvalidRequestException} from "../exception/InvalidRequestException";
import {messages} from "../exception/messages/Messages";
import {UserData} from "../model/UserData";
import {v4} from "uuid";

export class UserRepository {

  async checkIfAlreadyExist(email: string) {
    const userDB: User | null = await user.findFirst({where: {email: email}})
    if (userDB) {
      throw new InvalidRequestException(messages.INVALID_OBJECT, messages.INVALID_USER_NAME)
    }
  }

  async createNewUser(userData: UserData) {
    await user.create({
      data: {
        password: userData.password,
        email: userData.email,
        name: userData.name,
        id: v4()
      }
    });
  }

  async findByEmail(username: string): Promise<User | void | null> {
    return await user.findFirst({where: {email: username}})
  }
}