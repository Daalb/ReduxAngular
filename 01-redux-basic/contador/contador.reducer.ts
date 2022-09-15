import { Action } from "../ngrx-fake/ngrx";

//*Reducer --> Una función, que por lo general se llama Reducer y recibe acción y el estado anterior
export function contadorReducer(state = 10, action: Action){
    // if(action.type === 'INCREMENTAR'){
    //     return state += 1;
    // }

    //*Normalmente dentro del reducer se usa un switch
    switch(action.type){
        case 'INCREMENTAR':
            return state += 1;
        case 'DECREMENTAR':
            return state -= 1 ;
        case 'MULTIPLICAR':
            return state * action.payload;
        case 'DIVIDIR':
            return state / action.payload;
        case 'RESET':
            return state = 0;
        default:
            return state;
    }

}