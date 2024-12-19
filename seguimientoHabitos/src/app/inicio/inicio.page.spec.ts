import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { InicioPage } from './inicio.page';
import { AlertController } from '@ionic/angular';
import { AutenticacionService } from '../auth.service';

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockAlertController: any;
  let mockAuthService: any;

  beforeEach(async () => {
    // Creamos mocks para las dependencias
    mockActivatedRoute = {
      queryParams: of({ user: 'TestUser' }) // Simulamos que 'user' llega como parámetro
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate'), // Simulamos el método navigate de Router
      getCurrentNavigation: jasmine.createSpy('getCurrentNavigation').and.returnValue({
        extras: {
          state: { user: 'TestUser' }
        }
      }) // Mockeamos el método getCurrentNavigation
    };
    mockAlertController = {
      create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
        present: jasmine.createSpy('present')
      }))
    };
    mockAuthService = {}; // Simulamos el servicio de autenticación

    // Configuramos el TestBed
    await TestBed.configureTestingModule({
      declarations: [InicioPage],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: AlertController, useValue: mockAlertController },
        { provide: AutenticacionService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });

  it('should get user from queryParams', async () => {
    // Esperamos a que se resuelvan las suscripciones y cambios en el componente
    await fixture.whenStable(); // Espera a que todas las promesas y suscripciones se resuelvan

    // Ahora verificamos que el valor de 'usuario' sea 'TestUser'
    expect(component.usuario).toBe('TestUser');
  });

  it('should call navigate on menuPrincipal', () => {
    component.menuPrincipal();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/inicio']);
  });

  it('should call navigate on cerrarSesion', () => {
    component.cerrarSesion();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
