import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular'; // Asegúrate de importar el módulo
import { HabitosPage } from './habitos.page';
import { StorageService } from '../../services/storage.service'; // Ajusta según la ubicación de tu servicio

describe('HabitosPage', () => {
  let component: HabitosPage;
  let fixture: ComponentFixture<HabitosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()], // Importa el módulo de almacenamiento
      declarations: [HabitosPage],
      providers: [StorageService], // Asegúrate de proporcionar el servicio
    }).compileComponents();

    fixture = TestBed.createComponent(HabitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la página fue creada
  });
});
