// // Me permite injectar el servicio desde otras partes
// import { Injectable } from "@angular/core";

// @Injectable({
//     providedIn: 'root' //indicandole que el servicio va a ser global
// })

// // Clase export: para poder ser exportada y accesible desde cualquier lugar 
// export class AutenticacionService {

//     // Agregando una variable paara saber si el usuario esta loggeado o no
//     private usuarioLogeado: boolean = false;
//     // constructor por defecto
//     constructor (){}

//     // Metodo que retona si el usuario esta logeado
//     estaLogeado(): boolean{
//         return this.usuarioLogeado;
//     }

//     // Metodo para simular un inicio de sesion
//     iniciarSesion(){
//         this.usuarioLogeado = true;
//     }
//     // Metodo para el cierre de sesion
//     cerrarSesion(){
//         this.usuarioLogeado = false;
//     }

//     // Método de autenticación que devuelve true si las credenciales son correctas
//     //explica lo del triple igial y pregunta dirijida &&
//     authenticate(username: string, password: string): boolean {
//         return username === 'usuario' && password === 'contraseña';//////
//     }
// }