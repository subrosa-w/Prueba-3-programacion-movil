import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadesPage } from './actividad.page';


describe('ActividadPage', () => {
  let component: ActividadesPage;
  let fixture: ComponentFixture<ActividadesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
