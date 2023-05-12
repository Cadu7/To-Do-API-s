import {checkIsEmpty, checkIsEmptyList, checkIsNull, checkIsUUID, validateField} from "../utils/Validator"
import {ToDoItemsRequest, ToDoItemsRequestUpdate} from "../model/ToDoItemsRequest";
import {container} from "tsyringe";
import {ToDoRepository} from "../repository/ToDoRepository";
import {UserService} from "./UserService";
import {Customer} from "@prisma/client";
import {log} from "../config/Log";
import {InvalidRequestException} from "../exception/InvalidRequestException";
import {messages} from "../exception/messages/Messages";

export class ToDoItemsService {

  private readonly toDoRepository = container.resolve(ToDoRepository);
  private readonly userService = container.resolve(UserService);

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