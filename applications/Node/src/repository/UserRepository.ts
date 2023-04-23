import {user} from "./Prima";
import {User} from "@prisma/client"
import {InvalidRequest} from "../exception/InvalidRequest";
import {messages} from "../exception/messages/Messages";
import {UserData} from "../model/UserData";
import {hash} from "bcrypt";
import {v4} from "uuid";

export class UserRepository {

  async checkIfAlreadyExist(email: string) {
    const userDB: User | null = await user.findFirst({where: {email: email}})
    if (userDB) {
      throw new InvalidRequest(messages.INVALID_OBJECT, messages.INVALID_USER_NAME)
    }
  }

  async createNewUser(userData: UserData) {
    await user.create({
      data: {
        password: await hash(userData.password, 10),
        email: userData.email,
        name: userData.name,
        id: v4()
      }
    });
  }
}