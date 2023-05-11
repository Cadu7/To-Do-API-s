import {ToDoItemsRequest} from "../model/ToDoItemsRequest";
import {toDoList} from "./Prisma";
import {v4} from "uuid";

export class ToDoRepository {

  async create(param: { name: string; userId: string; items: ToDoItemsRequest[] }) {

    await toDoList.create({
      data: {
        id: v4(),
        name: param.name,
        updated_at: new Date(),
        created_at: new Date(),
        items: {create: param.items.map(item => ({id: v4(), content: item.content}))},
        customer: {
          connect: {
            id: param.userId
          }
        }
      },
      include: {
        items: true,
        customer: true
      }
    });
  }

  findAllByCustomerId(customerId: string) {
    return toDoList.findMany({
      include: {
        customer: true,
        items: true
      },
      where: {
        customer: {
          id: customerId
        }
      }
    })
  }

  async findOneByCustomerId(customerId: string, toDoId: string) {
    return toDoList.findFirst({
      include: {
        customer: true,
        items: true
      },
      where: {
        id: toDoId,
        customer: {
          id: customerId
        }
      }
    })
  }

  async deleteOneByIds(toDoId: string) {
    await toDoList.delete({
      where: {
        id: toDoId
      }
    })
  }

  listToDoIdsFromCustomerId(customerId: string): Promise<string[]> {
    return toDoList.findMany({
      where: {
        customer: {
          id: customerId
        }
      },
      select: {
        id: true
      }
    })
      .then(result => result.map(object => object.id))
  }

  addItemsToList(toDoId: string, id: string, items: ToDoItemsRequest[]) {
    return toDoList.update({
      where: {
        id: toDoId,
      },
      data: {
        items: {
          createMany: {data: items.map(item => ({id: v4(), content: item.content}))}
        },
        updated_at: new Date()
      }
    })
  }

  removeItemFromToDoList(toDoId: string, itemId: string) {
    return toDoList.update({
      where: {
        id: toDoId,
      },
      data: {
        items: {delete: {id: itemId}},
        updated_at: new Date()
      }
    })
  }

  async updateItem(toDoId: string, itemId: string, content: string | undefined, toDo: undefined | boolean) {
    await toDoList.update({
      where: {id: toDoId},
      data: {
        items: {
          update: {
            where: {
              id: itemId
            },
            data: {
              content: content,
              to_do: toDo
            }
          }
        }
      }
    })
  }
}