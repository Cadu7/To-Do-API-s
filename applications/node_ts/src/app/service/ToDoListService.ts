import {checkIsEmpty, checkIsNull, checkIsUUID, validateField} from "../utils/Validator"
import {ToDoItemsRequest} from "../model/ToDoItemsRequest";
import {container} from "tsyringe";
import {ToDoRepository} from "../repository/ToDoRepository";
import {UserService} from "./UserService";
import {Customer} from "@prisma/client";
import {ICompletedToDoListDataBase, IToDoList, toDoListMapper} from "../model/IToDoList";
import {log} from "../config/Log";
import {InvalidRequestException} from "../exception/InvalidRequestException";
import {messages} from "../exception/messages/Messages";

export class ToDoListService {
    
    private readonly toDoRepository = container.resolve(ToDoRepository);
    private readonly userService = container.resolve(UserService);
    
    async createToDoList(user: string, name: string, items: ToDoItemsRequest[] | null): Promise<string> {
        
        validateField(name, "name", checkIsNull, checkIsEmpty)
        
        const itemsToInsert = items ?? []
        const customer: Customer = await this.userService.findCustomerByUserName(user);
        let list = await this.toDoRepository.create({userId: customer.id, name, items: itemsToInsert});
        log.info(`To do list was created`)
        return list.id;
    }
    
    async findAllList(user: string): Promise<IToDoList[]> {
        
        const customer: Customer = await this.userService.findCustomerByUserName(user);
        const lists = await this.toDoRepository.findAllByCustomerId(customer.id);
        
        if (!lists || lists.length == 0) {
            log.error(`To do lists were not found`)
            throw new InvalidRequestException(messages.NOT_FOUND, messages.TO_DO_LIST_NOT_FOUND, 404);
        }
        
        log.info(`To do list was successfully found`)
        return lists.map(toDo => toDoListMapper(toDo));
    }
    
    async findOneList(user: string, toDoId: string): Promise<IToDoList> {
        
        validateField(toDoId, "toDoId", checkIsNull, checkIsEmpty, checkIsUUID)
        
        const toDo = await this.findToDoList(user, toDoId)
        
        log.info(`To do list was successfully found`)
        return toDoListMapper(toDo)
    }
    
    async deleteOne(user: string, toDoId: any): Promise<void> {
        
        validateField(toDoId, "toDoId", checkIsNull, checkIsEmpty, checkIsUUID)
        
        await this.verifyIfToDoIdIsFromCurrentUser(user, toDoId);
        await this.toDoRepository.deleteOneByIds(toDoId);
        log.info(`To do list with the id ${toDoId} was deleted`)
    }
    
    async updateOne(user: string, toDoId: string, name: string) {
        validateField(toDoId, "toDoId", checkIsNull, checkIsEmpty, checkIsUUID)
        validateField(name, "name", checkIsNull)
        
        await this.verifyIfToDoIdIsFromCurrentUser(user, toDoId);
        
        await this.toDoRepository.updateListName(toDoId, name)
        log.info(`To do list with the id ${toDoId} has the name updated`)
    }
    
    private async verifyIfToDoIdIsFromCurrentUser(userName: string, toDoId: string): Promise<Customer> {
        const customer: Customer = await this.userService.findCustomerByUserName(userName);
        
        const toDoIds = await this.toDoRepository.listToDoIdsFromCustomerId(customer.id);
        
        if (!toDoIds.includes(toDoId)) {
            throw new InvalidRequestException(messages.INVALID_OBJECT, messages.CANNOT_PERFORM_THIS_ACTION)
        }
        return customer;
    }
    
    private async findToDoList(user: string, toDoId: string): Promise<ICompletedToDoListDataBase> {
        const customer: Customer = await this.userService.findCustomerByUserName(user);
        const toDo = await this.toDoRepository.findOneByCustomerId(customer.id, toDoId);
        
        if (!toDo) {
            log.error(`To do list with the id ${toDoId} was not found`)
            throw new InvalidRequestException(messages.NOT_FOUND, messages.TO_DO_LIST_NOT_FOUND, 404);
        }
        return toDo;
    }
}