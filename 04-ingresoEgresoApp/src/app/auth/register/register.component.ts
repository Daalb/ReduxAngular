import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../../shared/ui.actions';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registroForm!: FormGroup;
  public cargando: boolean = false;
  public uiSubscription!: Subscription;

  constructor( 
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  //*Cuando la página sea destruida
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit() {

    this.registroForm = this.fb.group({
      nombre:   ['', Validators.required ],
      correo:   ['', [Validators.required, Validators.email ] ],
      password: ['', Validators.required ],
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading
    })

  }

  crearUsuario() {
    
    if ( this.registroForm.invalid ) { return; }
    
    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    this.store.dispatch(actions.isLoading())


    const { nombre, correo, password } = this.registroForm.value;

    this.authService.crearUsuario( nombre, correo, password )
      //@ts-ignore
      .then( credenciales => {
        console.log(credenciales);

        // Swal.close();
        this.store.dispatch(actions.stopLoading());

        this.router.navigate(['/']);
      })
      //@ts-ignore
      .catch( err => {
        this.store.dispatch(actions.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }

}
