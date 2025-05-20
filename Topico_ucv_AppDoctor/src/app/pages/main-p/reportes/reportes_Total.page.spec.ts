import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Reportes_TotalPage } from './reportes_Total.page';

describe('ReportesPage', () => {
  let component: Reportes_TotalPage;
  let fixture: ComponentFixture<Reportes_TotalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Reportes_TotalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
