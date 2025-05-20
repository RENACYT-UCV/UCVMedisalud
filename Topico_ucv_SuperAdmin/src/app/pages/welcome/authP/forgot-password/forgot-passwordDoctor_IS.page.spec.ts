import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordDoctor_ISPage } from './forgot-passwordDoctor_IS.page';

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordDoctor_ISPage;
  let fixture: ComponentFixture<ForgotPasswordDoctor_ISPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordDoctor_ISPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
