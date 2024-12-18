import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

// Método de autenticación que devuelve true si las credenciales son correctas
//explica lo del triple igial y pregunta dirijida &&
authenticate(username: string, password: string): boolean {
  return username === 'usuario' && password === 'contraseña';//////
  }
}