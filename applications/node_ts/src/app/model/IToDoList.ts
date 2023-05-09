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
  return item.deleted == null ?
    {
      toDo: item.to_do,
      content: item.content,
      id: item.id,
    } : {
      toDo: item.to_do,
      content: item.content,
      id: item.id,
      deleted: item.deleted
    }
}

export const toDoListMapper = (toDo: (ToDoList & { items: ToDoItem[]; customer: Customer | null })): IToDoList => {
  return {
    id: toDo.id,
    name: toDo.name,
    lastUpdate: toDo.updated_at,
    items: toDo.items
      // .filter(item => !(item.deleted && item.deleted == true))
      .map(item => toDoItemMapper(item))
  }
}