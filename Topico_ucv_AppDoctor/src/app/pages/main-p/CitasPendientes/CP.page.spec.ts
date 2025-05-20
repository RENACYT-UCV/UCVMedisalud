import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CPPage } from './CP.page';

describe('CPPage', () => {
  let component: CPPage;
  let fixture: ComponentFixture<CPPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
