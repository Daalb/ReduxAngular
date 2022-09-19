import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth,
              private firestore: AngularFirestore) { }

    //Permite avisar si sucede algun cambio con la autenticación o si quiiere entrar a una ruta y puede o no entrar
    initAuthListener() {
    //@ts-ignore
    this.auth.authState.subscribe( fuser => {
      console.log("fuser", fuser );
      console.log("fuser uid", fuser?.uid );
      console.log("fuser emal", fuser?.email );
    })

  }



  async crearUsuario( nombre:string, email: string, password: string ) {

    // console.log({ nombre, email, password });
    return this.auth.createUserWithEmailAndPassword( email, password )
            //@ts-ignore  
            .then( ({ user }) => {
              //@ts-ignore
              const newUser = new Usuario( user!.uid, nombre, user.email );
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
