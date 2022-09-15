import { incrementadorAction } from "./contador/contador.actions";
import { contadorReducer } from "./contador/contador.reducer";
import { Action, Reducer } from "./ngrx-fake/ngrx";

//? Todo esto es una simulación de lo que hace el store internamente (algo básico).


//*Store --> Es de tipo generico, es decir,cualquier cosa
class Store<T>{
   // private state: T //* Es del mismo tipo de la clase, si la clase es number state es number y así

    constructor(
        private reducer: Reducer<T>, //*El reducer trabaja con información de tipo generico
        private state: T
    ){
        
    }

    getState(){//*Esto es porque el state es una propiedad privada
        return this.state
    }

    dispatch(action: Action){ //*El store llama las acciones con este metodo 
        this.state = this.reducer(this.state,action);//*Simplemente ejecuta la acción
    }
}


const store = new Store(contadorReducer,10); //*

console.log(store.getState());  

store.dispatch(incrementadorAction);
console.log(store.getState());
