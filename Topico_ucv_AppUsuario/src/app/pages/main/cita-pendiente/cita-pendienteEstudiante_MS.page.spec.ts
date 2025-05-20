import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitaPendientePage } from './cita-pendienteEstudiante_MS.page';


describe('CitaPendientePage', () => {
  let component: CitaPendientePage;
  let fixture: ComponentFixture<CitaPendientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaPendientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
