// src/app/login/login.page.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { AutenticacionService } from '../autenticacion.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let autenticacionService: AutenticacionService;

  beforeEach(async () => { //función de angular para realizar pruebas
  await TestBed.configureTestingModule({
    declarations: [ LoginPage ],// Declaramos LoginPage como el componente a probar
    imports: [ IonicModule.forRoot(), ReactiveFormsModule], //importa el modulo...
    providers: [ AutenticacionService ]//Proporciona el servicio AuthService a las pruebas
  }).compileComponents();//Compila los componentes declarados

  fixture = TestBed.createComponent(LoginPage);
  component = fixture.componentInstance;
  autenticacionService = TestBed.inject(AutenticacionService);//Inyecta AuthService y lo asigna.
  fixture.detectChanges();//Detecta cambios en el componente antes de iniciar las p.
});

//1- Verifica que la página se crea correctamente
it('debería crear la página', () => {
  expect(component).toBeTruthy(); //Verifica que `component` no sea null o undefined.
  });

  //spyOn es una función de Jasmine, el framework de pruebas usado en Angular, que permite "espiar" métodos de un objeto

  //2- // Simula autenticación exitosa
  it('debería mostrar "¡Inicio de sesión exitoso!" para credenciales válidas', () => {
  spyOn(autenticacionService, 'authenticate').and.returnValue(true);// Simula que `authenticate` devuelve true para credenciales válidas
  component.onLogin();
  expect(component.loginMessage).toBe('¡Inicio de sesión exitoso!'); // Verifica el mensaje de éxito
  });
  //3 - // Simula autenticación fallida
  it('debería mostrar "Usuario o contraseña incorrectos" para credenciales inválidas', () => {
  spyOn(autenticacionService, 'authenticate').and.returnValue(false);
  component.onLogin();
  expect(component.loginMessage).toBe('Usuario o contraseña incorrectos'); // Verifica el mensaje de error
  });
  });
