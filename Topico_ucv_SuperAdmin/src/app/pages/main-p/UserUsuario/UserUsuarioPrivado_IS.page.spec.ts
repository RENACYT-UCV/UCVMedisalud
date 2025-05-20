import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserUsuarioPrivado_ISPage } from './UserUsuarioPrivado_IS.page';

describe('UserUsuarioPrivado_ISPage', () => {
  let component: UserUsuarioPrivado_ISPage;
  let fixture: ComponentFixture<UserUsuarioPrivado_ISPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUsuarioPrivado_ISPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
