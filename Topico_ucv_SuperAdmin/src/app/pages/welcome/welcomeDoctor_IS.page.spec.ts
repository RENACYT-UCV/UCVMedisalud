import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeDoctor_ISPage } from './welcomeDoctor_IS.page';

describe('WelcomeDoctor_ISPage', () => {
  let component: WelcomeDoctor_ISPage;
  let fixture: ComponentFixture<WelcomeDoctor_ISPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeDoctor_ISPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
