import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateCitaOculistaEstudianteMSComponent } from './add-update-cita-oculistaEstudiante_MS.component';

describe('AddUpdateCitaOculistaEstudianteMSComponent', () => {
  let component: AddUpdateCitaOculistaEstudianteMSComponent;
  let fixture: ComponentFixture<AddUpdateCitaOculistaEstudianteMSComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateCitaOculistaEstudianteMSComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateCitaOculistaEstudianteMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
