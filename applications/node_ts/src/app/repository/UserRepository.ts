import {user} from "./Prisma";
import {User} from "@prisma/client"
import {InvalidRequestException} from "../exception/InvalidRequestException";
import {messages} from "../exception/messages/Messages";
import {v4} from "uuid";

export class UserRepository {
    
    async checkIfAlreadyExist(email: string) {
        const userDB: User | null = await user.findFirst({where: {email: email}})
        if (userDB) {
            throw new InvalidRequestException(messages.INVALID_OBJECT, messages.INVALID_USER_NAME)
        }
    }
    
    create(userData: { password: string, email: string }): Promise<User> {
        return user.create({
            data: {
                password: userData.password,
                email: userData.email,
                id: v4()
            }
        });
    }
    
}