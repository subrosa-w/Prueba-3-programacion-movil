// src/app/guards/auth.guard.spec.ts

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AutenticacionGuard } from './auth.guard';
import { AutenticacionService } from '../auth.service';
import { of } from 'rxjs';

describe('AutenticacionGuard', () => {
  let guard: AutenticacionGuard;
  let authServiceSpy: jasmine.SpyObj<AutenticacionService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Crear un espía del servicio de autenticación
    authServiceSpy = jasmine.createSpyObj('AutenticacionService', ['estaLogeado']);
    // Crear un espía del router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AutenticacionGuard,
        { provide: AutenticacionService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
    });
    guard = TestBed.inject(AutenticacionGuard);  // Inyecta el guard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();  // Verifica que el guard fue creado
  });

  it('should allow access if logged in', () => {
    authServiceSpy.estaLogeado.and.returnValue(true);  // Simula que el usuario está autenticado
    const result = guard.canActivate(null as any, null as any);  // Llama a canActivate sin parámetros reales
    expect(result).toBe(true);  // Espera que se permita el acceso
  });

  it('should deny access if not logged in', () => {
    authServiceSpy.estaLogeado.and.returnValue(false);  // Simula que el usuario no está autenticado
    const result = guard.canActivate(null as any, null as any);  // Llama a canActivate con valores falsos
    expect(result).toBe(false);  // Espera que se niegue el acceso
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);  // Verifica que la redirección al login ocurra
  });
});
