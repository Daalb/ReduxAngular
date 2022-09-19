import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor( private authService: AuthService,
               private router: Router ) {}

  //*Proteger las rutas para que los usuarios no puedan ingresar si no cumplen la condición
  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((isAuth) => {
        if (!isAuth) this.router.navigate(['/login']);
      })
    );
  }
}
