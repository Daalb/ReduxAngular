import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { reset } from '../contador.actions';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styles: [
  ]
})
export class NietoComponent implements OnInit {
  // @Input() public contador!: number;
  // @Output() public contadorCambio = new EventEmitter<number>();
  public contador!: number;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('contador')
      .subscribe( contador => this.contador = contador)
  }

  reset(){
    // this.contador = 0;
    // this.contadorCambio.emit(0);
    this.store.dispatch(reset())
  }
}
