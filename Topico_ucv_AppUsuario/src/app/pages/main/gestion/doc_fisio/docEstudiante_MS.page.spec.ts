import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocPage } from './docEstudiante_MS.page';

describe('DocPage', () => {
  let component: DocPage;
  let fixture: ComponentFixture<DocPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
