export interface ToDoItemsRequest {
  content: string
}
export interface ToDoItemsRequestUpdate {
  content?: string
  toDo?: boolean
}