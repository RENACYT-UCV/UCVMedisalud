import { ComponentFixture, TestBed } from '@angular/core/testing';
import { password_Doctor } from './password_Doctor.page';

describe('password_Doctor', () => {
  let component: password_Doctor;
  let fixture: ComponentFixture<password_Doctor>;

  beforeEach(() => {
    fixture = TestBed.createComponent(password_Doctor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
