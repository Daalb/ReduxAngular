import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import { contadorReducer } from './contador/contador.reducer';
import { incrementadorAction } from './contador/contador.actions';

//? Ya utilizando la librería de redux 
const store: Store = configureStore({
    reducer: contadorReducer
})

store.subscribe(() => {//*Cuando el store sea cambiado por los dispatch se notificará(que el state cambió) por medio del subscribe. Cada una de las modificaciones al state ejecutará el subscribe
    console.log('Subs: ', store.getState());
})

store.dispatch(incrementadorAction);
store.dispatch(incrementadorAction);
store.dispatch(incrementadorAction);
store.dispatch(incrementadorAction);
store.dispatch(incrementadorAction);