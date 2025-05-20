import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthDoctor_ISPage } from './authDoctor_IS.page';

describe('AuthDoctor_ISPage', () => {
  let component: AuthDoctor_ISPage;
  let fixture: ComponentFixture<AuthDoctor_ISPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDoctor_ISPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
