import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from '../actions';

export interface UsuariosState {
    users: Usuario[];
    loaded: boolean;
    loading: boolean;
    error: any; 
}

const usuariosInitialState: UsuariosState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
}

export const usuariosReducer = createReducer(usuariosInitialState,
    on(cargarUsuarios, state => ({ ...state, loading: true})),
    on(cargarUsuariosSuccess, (state, { usuarios }) => ({ 
        ...state, 
        loading: false,
        loaded: true,
        //@ts-ignore
        users: [...usuarios]
    })),
    on(cargarUsuariosError, (state, { payload }) => ({ 
        ...state, 
        loading: true,
        loaded: true,
        error: payload
    })),

);

