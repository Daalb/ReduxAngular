import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';
import * as actions from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm!: FormGroup;
  public cargando: boolean = false;
  public uiSubscription!: Subscription;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router,
               private store: Store<AppState> ) { }

  //*Cuando la página sea destruida
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ],
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading
    })
  }

  login() {

    if ( this.loginForm.invalid ) { return; }

    this.store.dispatch(actions.isLoading())

    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });

    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario( email, password )
      //@ts-ignore
      .then( credenciales => {
        // console.log(credenciales);
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
