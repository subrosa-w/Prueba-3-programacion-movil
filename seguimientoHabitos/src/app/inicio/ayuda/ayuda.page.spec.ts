import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AyudaPage } from './ayuda.page';

describe('AyudaPage', () => {
  let component: AyudaPage;
  let fixture: ComponentFixture<AyudaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AyudaPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => null, // Devuelve `null` para cualquier clave de parámetros de ruta
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AyudaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la página fue creada
  });
});
