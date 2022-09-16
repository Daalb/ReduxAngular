import { createReducer, on } from "@ngrx/store";
import { decrementar, dividir, incrementar, multiplicar, reset } from "./contador.actions";


//*El reducer debe ser autónomo. NO debe hacer ninguna petición al exterior. Todo lo que haga lo debe resolver internamente
//*Sin usar la librería
/*
export function contadorReducer(state:number=10, action: Action){
    switch(action.type){
        case incrementar.type:
            return state + 1;
        
        case decrementar.type:
            return state - 1;

        default:
            return state
    }
}*/

export const initialState = 20;

export const contadorReducer = createReducer(
    initialState,
    on(incrementar, (state) => state + 1),
    on(decrementar, (state) => state - 1),
    on(multiplicar, (state, {numero}) => state * numero), //*Puedo hacer esto porque en el archivo de acciones definí que esta acción recibirá un número
    on(dividir, (state, {numero}) => state / numero),
    on(reset, (state) => initialState )
  );