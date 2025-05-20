import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateCitaEstudianteMSComponent } from './add-update-citaEstudiante_MS.component';

describe('AddUpdateCitaEstudianteMSComponent', () => {
  let component: AddUpdateCitaEstudianteMSComponent;
  let fixture: ComponentFixture<AddUpdateCitaEstudianteMSComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateCitaEstudianteMSComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateCitaEstudianteMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
