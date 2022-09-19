//*Estado global de la aplicacion

import { ActionReducerMap } from "@ngrx/store";
import { filtrosValidos } from "./filtro/filtro.actions";
import { filtroReducer } from "./filtro/filtro.reducer";
import { Todo } from "./todos/models/todo.model";
import { todoReducer } from './todos/todos.reducer';

export interface AppState{
    todos: Todo[],
    filtro: filtrosValidos
}


//*T0dos los reducers de la app
export const appReducers: ActionReducerMap<AppState> = {
    todos: todoReducer,
    filtro: filtroReducer

}