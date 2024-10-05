import {Customer, Item, List} from "@prisma/client"

export interface IToDoItem {
    id: string,
    content: string,
    done: boolean,
}

export interface IToDoList {
    id: string,
    name: string,
    lastUpdate: Date,
    items: IToDoItem[]
}

export interface ICompletedToDoListDataBase extends List {
    items: Item[];
    customer: Customer
}

const toDoItemMapper = (item: Item): IToDoItem => {
    return {
        done: item.done,
        content: item.content,
        id: item.id,
    }
}

export const toDoListMapper = (toDo: ICompletedToDoListDataBase): IToDoList => {
    return {
        id: toDo.id,
        name: toDo.name,
        lastUpdate: toDo.updated_at,
        items: toDo.items
            .map(item => toDoItemMapper(item))
    }
}