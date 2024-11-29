import { CanActivateFn, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' //indicandole que el servicio va a ser global
})

export class AutenticacionGuard implements CanActivate {

  constructor(private authService: AutenticacionService, private router: Router){}

  // Metodo que descide si se puede acceder a la ruta
  canActivate(): boolean{

    if(this.authService.estaLogeado()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }

  }
}