import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducers';


///*Reducer global de la app para centralizarlos todos
export interface AppState {
   ui: ui.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
}