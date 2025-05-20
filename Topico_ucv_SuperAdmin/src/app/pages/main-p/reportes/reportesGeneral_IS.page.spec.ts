import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportesGeneral_ISPage } from './reportesGeneral_IS.page';

describe('ReportesGeneral_ISPage', () => {
  let component: ReportesGeneral_ISPage;
  let fixture: ComponentFixture<ReportesGeneral_ISPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesGeneral_ISPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
