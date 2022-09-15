//*Acciones --> Lo que le dice al Reducer que es lo que va a hacer
export interface Action{
    type: string; //*Lo que hará la acción.
    payload?: any;
}

// const incrementadorAction: Action = {
//     type: 'INCREMENTAR'
// }



export interface Reducer<T>{//*El estado será del tipo del reducer. Es decir, si el reducer maneja numeros el estado será numero, si maneja booleanos el estado será booleano y así
    (state: T, action: Action): T
}