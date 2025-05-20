import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Iniciar_Doctor_AppPage } from './Iniciar_Doctor_App.page';

describe('Iniciar_Doctor_AppPage', () => {
  let component: Iniciar_Doctor_AppPage;
  let fixture: ComponentFixture<Iniciar_Doctor_AppPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Iniciar_Doctor_AppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
