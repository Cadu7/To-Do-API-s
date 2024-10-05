import {UserData} from "../model/UserData";
import {checkIsEmail, checkIsEmpty, checkIsNull, validateField} from "../utils/Validator";
import {container} from "tsyringe";
import {UserRepository} from "../repository/UserRepository";
import {log} from "../config/Log";
import {InvalidRequestException} from "../exception/InvalidRequestException";
import {messages} from "../exception/messages/Messages";
import {SecurityService} from "./SecurityService";
import {Customer, User} from "@prisma/client";
import {CustomerRepository} from "../repository/CustomerRepository";
import {ICompletedCustomer} from "../model/ICompletedCustomer";

export class UserService {
    
    private readonly userRepository = container.resolve(UserRepository);
    private readonly customerRepository = container.resolve(CustomerRepository);
    private readonly securityService = container.resolve(SecurityService);
    
    async createUser(user: UserData): Promise<void> {
        
        validateField(user.name, "name", checkIsNull, checkIsEmpty)
        validateField(user.email, "email", checkIsNull, checkIsEmpty, checkIsEmail)
        validateField(user.password, "password", checkIsNull, checkIsEmpty)
        
        if (user.password.length < 12) {
            throw new InvalidRequestException(messages.INVALID_OBJECT, messages.PASSWORD_TOO_SHORT)
        }
        
        await this.userRepository.checkIfAlreadyExist(user.email);
        
        user.password = await this.securityService.encryptPassword(user.password);
        
        log.info(`Creating new user for application`)
        const createdUser = await this.userRepository.create({email: user.email, password: user.password});
        await this.createCustomer(createdUser.id, user.name);
        log.info(`The user was successfully created`)
    }
    
    private async createCustomer(userId: string, userName: string): Promise<void> {
        await this.customerRepository.create(userId, userName);
    }
    
    findCustomerByEmail(email: string): Promise<ICompletedCustomer | void | null> {
        return this.customerRepository.findCustomerByEmail(email);
    }
    
    async findCustomerByUserName(userName: string): Promise<Customer> {
        const customer = await this.customerRepository.findCustomerByEmail(userName);
        
        if (!customer) {
            log.error(`Customer with name ${userName} was not fount`)
            throw new InvalidRequestException(messages.INVALID_OBJECT, messages.CUSTOMER_NOT_FOUND);
        }
        return customer;
    }
}