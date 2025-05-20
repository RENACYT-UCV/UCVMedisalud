import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDoctorPrivado_ISPage } from './UserDoctorPrivado_IS.page';

describe('UserDoctorPage', () => {
  let component: UserDoctorPrivado_ISPage;
  let fixture: ComponentFixture<UserDoctorPrivado_ISPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDoctorPrivado_ISPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
