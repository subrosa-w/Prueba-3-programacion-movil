import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AutenticacionService } from '../autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  usuario1: string = '';
  contrasena1: string = '';

  
  usuarios = [
    { usuario: 'Subrosa', contrasena: 'Subrosa1234@' },
    { usuario: 'Mooncake', contrasena: 'Mooncake1234@' }
  ];

  
  logueado: boolean = false;

  constructor(
    private authService: AutenticacionService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {}


  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK']
    });
    await alert.present();
  }

  
  validarUsuario(event: Event) {
    event.preventDefault();

    let navigationExtras: NavigationExtras = {
      state: {
        user: this.usuario1
      }
    };

   
    if (this.usuario1 === "" || this.contrasena1 === "") {
      this.presentAlert('Error', 'Los campos no pueden estar vacíos.');
      return;
    } 
    const usuarioValido = this.usuarios.some(u => u.usuario === this.usuario1 && u.contrasena === this.contrasena1);

    if (!usuarioValido) {
      this.presentAlert('Error', 'Los datos son incorrectos.');
      return;
    }
    this.presentAlert('Éxito', 'Usted ha accedido exitosamente.');
    this.authService.iniciarSesion();
    this.logueado = true; 
    this.router.navigate(['/inicio'], navigationExtras);
  }
  toggleSignUpMode() {
    const container = document.querySelector('.container') as HTMLElement;
    container?.classList.add('sign-up-mode');
  }
  toggleSignInMode() {
    const container = document.querySelector('.container') as HTMLElement;
    container?.classList.remove('sign-up-mode');
  }
}




