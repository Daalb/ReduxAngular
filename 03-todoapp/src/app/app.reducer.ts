//*Estado global de la aplicacion

import { Todo } from "./todos/models/todo.model";

export interface AppState{
    todos: Todo[]
}