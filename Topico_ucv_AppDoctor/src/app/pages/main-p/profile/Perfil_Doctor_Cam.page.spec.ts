import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Perfil_Doctor_CamPage } from './Perfil_Doctor_Cam.page';

describe('Perfil_Doctor_CamPage', () => {
  let component: Perfil_Doctor_CamPage;
  let fixture: ComponentFixture<Perfil_Doctor_CamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Perfil_Doctor_CamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
