import { TestBed } from '@angular/core/testing';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let storage: Storage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()], // Importa y configura el módulo de almacenamiento
      providers: [StorageService],
    }).compileComponents();

    storage = TestBed.inject(Storage); // Inyecta el Storage
    await storage.create(); // Asegúrate de inicializar el Storage
    service = TestBed.inject(StorageService); // Inyecta el servicio de StorageService
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio fue creado correctamente
  });
});
