import {checkIsEmpty, checkIsNull, validateField} from "../utils/Validator";
import {compareSync, hash} from "bcrypt";
import {container} from "tsyringe";
import {UserService} from "./UserService";
import {messages} from "../exception/messages/Messages";
import {AuthRequestException} from "../exception/AuthRequestException";
import {sign, verify} from 'jsonwebtoken'
import {env} from "../config/Env";
import {ICompletedCustomer} from "../model/ICompletedCustomer";

const {security} = env.application

export class SecurityService {
    
    private readonly ISSUER: string = "to-do-api-node";
    
    async login(username: string, password: string): Promise<string> {
        
        validateField(username, "username", checkIsNull, checkIsEmpty)
        validateField(password, "password", checkIsNull, checkIsEmpty)
        
        const customer = await container.resolve(UserService).findCustomerByEmail(username);
        if (!customer) {
            throw new AuthRequestException(messages.INVALID_OBJECT, messages.INCORRECT_USER_OR_PASSWORD);
        }
        
        if (!this.verifyPassword(password, customer.user.password)) {
            throw new AuthRequestException(messages.INVALID_OBJECT, messages.INCORRECT_USER_OR_PASSWORD);
        }
        
        return this.generateToken(customer);
    }
    
    encryptPassword(password: string): Promise<string> {
        return hash(password, 10)
    }
    
    verifyPassword(password: string, encrypted: string) {
        return compareSync(password, encrypted)
    }
    
    verifyToken(token: string): any {
        try {
            return verify(token, security.secret, {issuer: this.ISSUER})
        } catch (error) {
            throw new AuthRequestException(messages.UNAUTHORIZED, messages.MISSING_OR_WRONG_TOKEN)
        }
    }
    
    private generateToken(customer: ICompletedCustomer): string {
        return sign(
            {email: customer.user.email, name: customer.name},
            security.secret,
            {issuer: this.ISSUER, expiresIn: security.expireIn}
        )
    }
}