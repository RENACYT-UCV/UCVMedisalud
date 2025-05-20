import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateCitaFisioterapiaEstudianteMSComponent } from './add-update-cita-fisioterapiaEstudiante_MS.component';

describe('AddUpdateCitaFisioterapiaComponent', () => {
  let component: AddUpdateCitaFisioterapiaEstudianteMSComponent;
  let fixture: ComponentFixture<AddUpdateCitaFisioterapiaEstudianteMSComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateCitaFisioterapiaEstudianteMSComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateCitaFisioterapiaEstudianteMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
