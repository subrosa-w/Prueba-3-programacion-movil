import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AutenticacionService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';///?

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup; // Formulario reactivo para usuario y contraseña
  loginMessage: string = ''; // Mensaje que muestra el resultado del login
  
  usuario1: string = '';
  contrasena1: string = '';

  
  usuarios = [
    { usuario: 'Subrosa', contrasena: 'Subrosa1234@' },
    { usuario: 'Mooncake', contrasena: 'Mooncake1234@' },
    { usuario: '1234', contrasena: '1234' }
  ];

  
  logueado: boolean = false;

  constructor(
    private authService: AutenticacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController 
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

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

//----------------------------------------------
///como { username: 'valor', password: 'valor' }
  // Método que se llama al presionar el botón de "Iniciar sesión"
  onLogin() {
    const { username, password } = this.loginForm.value;//campos y valores ungresados
    // Validación de las credenciales usando el servicio de autenticación
    if (this.authService.authenticate(username, password))
    {//devuelve un true si authe.
      this.loginMessage = '¡Inicio de sesión exitoso!';
    } else {
      this.loginMessage = 'Usuario o contraseña incorrectos';
    }
  }

}




