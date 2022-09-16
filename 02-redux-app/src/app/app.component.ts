import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import * as actions  from './contador/contador.actions';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  public contador!: number;

  constructor(
    private store: Store<AppState>//*Es el tipo del store
  ){
    // this.contador = 10;

    // this.store.subscribe( state => {//* Esto escucha TODOS los estados de la aplicación
    //   console.log(state);
    //   this.contador = state.contador;
    // })

    this.store.select('contador').subscribe( contador => this.contador = contador)//*En este caso solo estraigo el valor de lo que quiero escuchar.

  }


  incrementar(){
    // this.contador += 1;
    this.store.dispatch(actions.incrementar());
  }

  decrementar(){
    // this.contador -=1;
    this.store.dispatch(actions.decrementar());
  }

}
