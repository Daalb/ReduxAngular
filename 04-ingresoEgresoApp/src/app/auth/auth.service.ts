import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';

import * as authActions  from './auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userSubscription!: Subscription;

  private _user!: User | null;

  get user() {
    return this._user;
  }


  constructor( 
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

    //Permite avisar si sucede algun cambio con la autenticación o si quiiere entrar a una ruta y puede o no entrar
    initAuthListener() {
    //@ts-ignore
    this.auth.authState.subscribe( fuser => {
      // console.log("fuser", fuser );
      // console.log("fuser uid", fuser?.uid );
      // console.log("fuser emal", fuser?.email );
      this.userSubscription = this.firestore.doc(`${fuser?.uid}/usuario`).valueChanges()
        .subscribe((firestoreUser: any) => {
          if(fuser){
            const user = User.fromFirebase(firestoreUser);
            this._user = user;
            this.store.dispatch(authActions.SET_USER({user}));
          }else{
            this._user = null;
            this.userSubscription.unsubscribe();
            this.store.dispatch(authActions.UNSET_USER());
            this.store.dispatch( ingresoEgresoActions.unSetItems() );
          }
        })
    })

  }



  async crearUsuario( nombre:string, email: string, password: string ) {

    // console.log({ nombre, email, password });
    return this.auth.createUserWithEmailAndPassword( email, password )
            //@ts-ignore  
            .then( ({ user }) => {
              //@ts-ignore
              const newUser = new User( user!.uid, nombre, user.email );
              return this.firestore.doc(`${ user!.uid }/usuario`).set({ ...newUser });
            });

  }

  loginUsuario( email:string, password:string) {
    return this.auth.signInWithEmailAndPassword( email, password );
  }

  logout() {
    return this.auth.signOut()
  }

  //*Saber si está autenticado o no
  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => {
        console.log(fbUser);
        return fbUser !== null} )
    );
  }

}
