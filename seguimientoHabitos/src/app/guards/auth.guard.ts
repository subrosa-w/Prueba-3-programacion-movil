// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AutenticacionService } from '../auth.service';

@Injectable({
  providedIn: 'root', // El guard será proporcionado de forma global
})
export class AutenticacionGuard implements CanActivate {
  
  constructor(private authService: AutenticacionService, private router: Router) {}

  // Método que decide si se puede acceder a la ruta
  canActivate(
    route: ActivatedRouteSnapshot,  // Parámetro que contiene información sobre la ruta activada
    state: RouterStateSnapshot      // Parámetro que contiene el estado de la ruta
  ): boolean {
    if (this.authService.estaLogeado()) {
      return true;  // Permite el acceso si está logueado
    } else {
      this.router.navigate(['/login']);  // Redirige a login si no está logueado
      return false;  // No permite el acceso
    }
  }
}
