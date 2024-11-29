import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AutenticacionService } from '../autenticacion.service';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let authServiceSpy: jasmine.SpyObj<AutenticacionService>;

  beforeEach(async () => {
    // Mock de dependencias
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    authServiceSpy = jasmine.createSpyObj('AutenticacionService', ['iniciarSesion']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: AutenticacionService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an error alert if fields are empty', async () => {
    // Valores vacíos
    component.usuario1 = '';
    component.contrasena1 = '';

    // Mock del AlertController
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    component.validarUsuario();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Los campos no pueden estar vacios.',
      buttons: ['OK'],
    });
    expect(alertSpy.present).toHaveBeenCalled();
  });

  it('should show an error alert if user or password is incorrect', async () => {
    // Usuario incorrecto
    component.usuario1 = 'UsuarioIncorrecto';
    component.contrasena1 = 'ContraseñaIncorrecta';

    // Mock del AlertController
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    component.validarUsuario();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Los datos son incorrectos',
      buttons: ['OK'],
    });
    expect(alertSpy.present).toHaveBeenCalled();
  });

  it('should log in successfully and navigate to /inicio when credentials are valid', async () => {
    // Credenciales válidas (usuario 1)
    component.usuario1 = 'Subrosa';
    component.contrasena1 = 'Subrosa1234@';

    // Mock del AlertController
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    component.validarUsuario();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Exito',
      message: 'Usted ha accedido exitosamente.',
      buttons: ['OK'],
    });
    expect(alertSpy.present).toHaveBeenCalled();
    expect(authServiceSpy.iniciarSesion).toHaveBeenCalled();
    expect(component.logueado).toBeTrue();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/inicio'], {
      state: { user: 'Subrosa' },
    });
  });

  it('should log in successfully and navigate to /inicio with a different valid user', async () => {
    // Credenciales válidas (usuario 2)
    component.usuario1 = 'Mooncake';
    component.contrasena1 = 'Mooncake1234@';

    // Mock del AlertController
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    component.validarUsuario();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Exito',
      message: 'Usted ha accedido exitosamente.',
      buttons: ['OK'],
    });
    expect(alertSpy.present).toHaveBeenCalled();
    expect(authServiceSpy.iniciarSesion).toHaveBeenCalled();
    expect(component.logueado).toBeTrue();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/inicio'], {
      state: { user: 'Mooncake' },
    });
  });
});
