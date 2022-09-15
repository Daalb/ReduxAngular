import { Action } from "./ngrx-fake/ngrx";
import { decrementadorAction, dividirAction, incrementadorAction, multiplicarAction, resetAction } from './contador/contador.actions';

//*Reducer --> Una función, que por lo general se llama Reducer y recibe acción y el estado anterior
function reducer(state = 10, action: Action){
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


console.log(reducer(10, incrementadorAction)); // 11
console.log(reducer(10, decrementadorAction));// 9
console.log(reducer(10, multiplicarAction));// 2
console.log(reducer(10, dividirAction));// 5
console.log(reducer(10, resetAction));// 5
