import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registrarse_Doctor_LogPage } from './Registrarse_Doctor_Log.page';

describe('Registrarse_Doctor_LogPage', () => {
  let component: Registrarse_Doctor_LogPage;
  let fixture: ComponentFixture<Registrarse_Doctor_LogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Registrarse_Doctor_LogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
