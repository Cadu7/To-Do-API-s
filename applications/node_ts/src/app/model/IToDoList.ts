import {ToDoList, ToDoItem, Customer} from "@prisma/client"

export interface IToDoItem {
  id: string,
  content: string,
  toDo: boolean,
  deleted?: boolean,
}

export interface IToDoList {
  id: string,
  name: string,
  lastUpdate: Date,
  items: IToDoItem[]
}

const toDoItemMapper = (item: ToDoItem): IToDoItem => {
  return {
    toDo: item.to_do,
    content: item.content,
    id: item.id,
  }
}

export const toDoListMapper = (toDo: (ToDoList & { items: ToDoItem[]; customer: Customer | null })): IToDoList => {
  return {
    id: toDo.id,
    name: toDo.name,
    lastUpdate: toDo.updated_at,
    items: toDo.items
      .map(item => toDoItemMapper(item))
  }
}