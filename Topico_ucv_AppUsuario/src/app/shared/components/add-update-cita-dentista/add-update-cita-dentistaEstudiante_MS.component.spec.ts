import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateCitaDentistaEstudianteMSComponent } from './add-update-cita-dentistaEstudiante_MS.component';

describe('AddUpdateCitaDentistaComponent', () => {
  let component: AddUpdateCitaDentistaEstudianteMSComponent;
  let fixture: ComponentFixture<AddUpdateCitaDentistaEstudianteMSComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateCitaDentistaEstudianteMSComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateCitaDentistaEstudianteMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
