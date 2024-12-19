import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Asegúrate de tener ambos
import { LoginPage } from './login.page';
import { AutenticacionService } from '../auth.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: jasmine.SpyObj<AutenticacionService>; // Usa un espía para mockear el servicio

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AutenticacionService', ['authenticate']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule, // Agrega FormsModule si usas ngModel
      ],
      providers: [
        { provide: AutenticacionService, useValue: authServiceSpy }, // Usa el espía como mock
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AutenticacionService) as jasmine.SpyObj<AutenticacionService>; // Inyecta el espía
    fixture.detectChanges();
  });

  it('debería crear la página', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar "¡Inicio de sesión exitoso!" para credenciales válidas', () => {
    authService.authenticate.and.returnValue(true); // Simula autenticación exitosa
    component.onLogin();
    expect(component.loginMessage).toBe('¡Inicio de sesión exitoso!');
  });

  it('debería mostrar "Usuario o contraseña incorrectos" para credenciales inválidas', () => {
    authService.authenticate.and.returnValue(false); // Simula autenticación fallida
    component.onLogin();
    expect(component.loginMessage).toBe('Usuario o contraseña incorrectos');
  });
});

