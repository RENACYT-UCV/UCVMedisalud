import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Doctor_welcome_AppPage } from './Doctor_welcome_App.page';

describe('Doctor_welcome_AppPage', () => {
  let component: Doctor_welcome_AppPage;
  let fixture: ComponentFixture<Doctor_welcome_AppPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Doctor_welcome_AppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
