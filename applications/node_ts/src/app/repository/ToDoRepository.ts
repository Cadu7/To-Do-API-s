import {ToDoItemsRequest} from "../model/ToDoItemsRequest";
import {list} from "./Prisma";
import {v4} from "uuid";
import {ICompletedToDoListDataBase} from "../model/IToDoList";
import {List} from "@prisma/client";

export class ToDoRepository {
    
    create(param: { name: string; userId: string; items: ToDoItemsRequest[] }): Promise<List> {
        return list.create({
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
    
    findAllByCustomerId(customerId: string): Promise<ICompletedToDoListDataBase[]> {
        return list.findMany({
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
    
    findOneByCustomerId(customerId: string, toDoId: string): Promise<ICompletedToDoListDataBase | null> {
        return list.findFirst({
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
    
    async deleteOneByIds(toDoId: string): Promise<void> {
        await list.delete({
            where: {
                id: toDoId
            }
        })
    }
    
    async listToDoIdsFromCustomerId(customerId: string): Promise<string[]> {
        const result: { id: string }[] = await list.findMany({
            where: {
                customer: {
                    id: customerId
                }
            },
            select: {
                id: true
            }
        });
        return result.map(object => object.id);
    }
    
    async addItemsToList(toDoId: string, id: string, items: ToDoItemsRequest[]): Promise<void> {
        await list.update({
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
    
    async removeItemFromToDoList(toDoId: string, itemId: string): Promise<void> {
        await list.update({
            where: {
                id: toDoId,
            },
            data: {
                items: {delete: {id: itemId}},
                updated_at: new Date()
            }
        })
    }
    
    async updateItem(toDoId: string, itemId: string, done: boolean): Promise<void> {
        await list.update({
            where: {id: toDoId},
            data: {
                items: {
                    update: {
                        where: {
                            id: itemId
                        },
                        data: {
                            done: done
                        }
                    }
                },
                updated_at: new Date()
            }
        })
    }
    
    async updateListName(toDoId: string, content: string): Promise<void> {
        await list.update({
            where: {
                id: toDoId
            },
            data: {
                name: content,
                updated_at: new Date()
            }
        })
    }
}