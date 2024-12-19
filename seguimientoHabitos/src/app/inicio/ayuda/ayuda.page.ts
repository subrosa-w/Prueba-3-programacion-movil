// src/app/feedback/feedback.page.ts
import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AutenticacionService } from '../../auth.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage {

  logueado: boolean = true;

  name = '';
  email = '';
  message = '';

  constructor(private router: Router, private activerouter: ActivatedRoute, private alertController: AlertController, authService: AutenticacionService, private emailService: EmailService) { }

  enviarSugerencia() {
    this.emailService.sendEmail({
      name: this.name,
      email: this.email,
      message: this.message,
    })
    .then(() => {
      alert('Correo enviado correctamente');
      // Limpiar los campos después de enviar el correo
      this.name = '';
      this.email = '';
      this.message = '';
    })
    .catch((error) => {
      // Convierte el objeto de error a una cadena JSON para ver los detalles
      alert('Error al enviar correo: ' + JSON.stringify(error));
    });
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK']
    });
    await alert.present();
  }
  menuPrincipal(){
    this.router.navigate(['/inicio']);
  }

  menuHabitos(){
    this.router.navigate(['/inicio/habitos']);
  }

  menuActividad(){
   this.router.navigate(['/inicio/ayuda']);
 }

  cerrarSesion(){
    this.presentAlert('Cerrar sesion','Ha cerrado sesion.')
    this.logueado=false; //cambiamos el estado de la variable
    this.router.navigate(['/login']);
  }
}
