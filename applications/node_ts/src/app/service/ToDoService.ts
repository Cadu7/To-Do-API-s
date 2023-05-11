import {checkIsEmpty, checkIsEmptyList, checkIsNull, checkIsUUID, validateField} from "../utils/Validator"
import {ToDoItemsRequest, ToDoItemsRequestUpdate} from "../model/ToDoItemsRequest";
import {container} from "tsyringe";
import {ToDoRepository} from "../repository/ToDoRepository";
import {UserService} from "./UserService";
import {Customer, ToDoItem, ToDoList} from "@prisma/client";
import {IToDoList, toDoListMapper} from "../model/IToDoList";
import {log} from "../config/Log";
import {InvalidRequestException} from "../exception/InvalidRequestException";
import {messages} from "../exception/messages/Messages";

export class ToDoService {

  private readonly toDoRepository = container.resolve(ToDoRepository);
  private readonly userService = container.resolve(UserService);

  async createToDoList(user: string, name: string, items: ToDoItemsRequest[] | null) {

    validateField(name, "name", checkIsNull, checkIsEmpty)

    const itemsToInsert = items == null || false ? [] : items
    const customer: Customer = await this.userService.findCustomerByUserName(user);
    await this.toDoRepository.create({userId: customer.id, name, items: itemsToInsert})
    log.info(`To do list was created`)
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

  private async verifyIfToDoIdIsFromCurrentUser(userName: string, toDoId: string): Promise<Customer> {
    const customer: Customer = await this.userService.findCustomerByUserName(userName);

    const toDoIds = await this.toDoRepository.listToDoIdsFromCustomerId(customer.id);

    if (!toDoIds.includes(toDoId)) {
      throw new InvalidRequestException(messages.INVALID_OBJECT, messages.CANNOT_PERFORM_THIS_ACTION)
    }
    return customer;
  }

  async addItems(user: string, toDoId: string, items: ToDoItemsRequest[]) {

    validateField(toDoId, "toDoId", checkIsNull, checkIsEmpty, checkIsUUID)
    validateField(items, "items", checkIsEmptyList)

    const customer = await this.verifyIfToDoIdIsFromCurrentUser(user, toDoId);

    await this.toDoRepository.addItemsToList(toDoId, customer.id, items);
    log.info(`Items were successfully added to to-do-list`)
  }

  private async findToDoList(user: string, toDoId: string): Promise<(ToDoList & {
    items: ToDoItem[];
    customer: Customer | null
  })> {
    const customer: Customer = await this.userService.findCustomerByUserName(user);
    const toDo = await this.toDoRepository.findOneByCustomerId(customer.id, toDoId);

    if (!toDo) {
      log.error(`To do list with the id ${toDoId} was not found`)
      throw new InvalidRequestException(messages.NOT_FOUND, messages.TO_DO_LIST_NOT_FOUND, 404);
    }
    return toDo;
  }

  async deleteOneItemFromList(user: string, toDoId: string, itemId: string) {

    validateField(toDoId, "toDoId", checkIsNull, checkIsEmpty, checkIsUUID)
    validateField(itemId, "itemId", checkIsNull, checkIsEmpty, checkIsUUID)

    await this.verifyIfToDoIdIsFromCurrentUser(user, toDoId);

    await this.toDoRepository.removeItemFromToDoList(toDoId, itemId);
    log.info(`To do item with the id ${itemId} was deleted`)
  }

  async updateItem(user: string, toDoId: string, itemId: string, {content, toDo}: ToDoItemsRequestUpdate) {

    validateField(toDoId, "toDoId", checkIsNull, checkIsEmpty, checkIsUUID)
    validateField(itemId, "itemId", checkIsNull, checkIsEmpty, checkIsUUID)

    if (content == null && toDo == null) {
      log.error("No body for update was informed")
      throw new InvalidRequestException(messages.INVALID_OBJECT, messages.INSUFFICIENT_FIELDS);
    }

    await this.verifyIfToDoIdIsFromCurrentUser(user, toDoId);

    await this.toDoRepository.updateItem(toDoId, itemId, content, toDo);
    log.info(`To do item successfully updated`)
  }
}