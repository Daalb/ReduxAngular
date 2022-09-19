import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, crear, editar, toggle, toggleAll, limpiarTodos } from './todo.actions';


export const estadoInicial: Todo[] = [
    new Todo('Tarea 1'),
    new Todo('Tarea 2'),
    new Todo('Tarea 3'),
    new Todo('Tarea 4')
];

//? Tratar simpre de retornar un nuevo estado y no mutar el antiguo.
//! NO MUTAR EL ESTADO

export const todoReducer = createReducer(
    estadoInicial,
    on(limpiarTodos, state => state.filter(todo => !todo.completado)),
    on(crear, (state, { texto }) => [...state,new Todo(texto) ]), //*Esto que se hace porque no se puede mutar directamente el estado. Por lo tanto se crea un nuevo array con base al anterior y agregando el nuevo elemento.
    on(borrar, (state,{id}) => state.filter(todo => todo.id !== id)),
    on(toggle, (state, { id }) => {
        return state.map( todo => {
            if(todo.id === id){
                return {//*Hacer esto retoranrá un nuevo objeto basado en el objeto anterior y cambiando la propiedad completado
                    ...todo,
                    completado: !todo.completado
                }
            }else{
                return todo;
            }
        })
        //! NO HACER return state[1].completado;
    }),

    on(editar, (state, { id, texto }) => {
        return state.map( todo => {
            if(todo.id === id){
                return {
                    ...todo,
                    texto
                }
            }else{
                return todo;
            }
        })
    }),

    on(toggleAll, (state, {completado}) => {
        return state.map( todo => {
            return {
                ...todo,
                completado
            }
        })
    })

);