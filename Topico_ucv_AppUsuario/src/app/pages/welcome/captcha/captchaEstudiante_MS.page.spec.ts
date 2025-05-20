import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaptchaPage } from './captchaEstudiante_MS.page';

describe('CaptchaPage', () => {
  let component: CaptchaPage;
  let fixture: ComponentFixture<CaptchaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
