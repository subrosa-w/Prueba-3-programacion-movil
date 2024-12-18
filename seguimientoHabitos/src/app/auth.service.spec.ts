// src/app/auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { AutenticacionService } from './autenticacion.service';

describe('AutenticacionService', () => {
  let service: AutenticacionService;

  beforeEach(() => {
TestBed.configureTestingModule({});
service = TestBed.inject(AutenticacionService); // Inyecta el servicio antes de cada prueba
});

// 1 - Verifica que el servicio se crea correctamente
it('debería crear el servicio', () => {
expect(service).toBeTruthy();
});

// 2 - Prueba con credenciales válidas
it('debería retornar true para credenciales válidas', () =>
{
expect(service.authenticate('usuario', 'contraseña')).toBeTrue();
});

// 3 - Prueba con credenciales inválidas
it('debería retornar false para credenciales inválidas', ()=> {
expect(service.authenticate('wrongUser', 'wrongPass')).toBeFalse();
});
});