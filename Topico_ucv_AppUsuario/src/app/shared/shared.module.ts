import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderEstudianteMSComponent } from 'src/app/shared/components/header/headerEstudiante_MS.component';
import { CustomInputEstudianteMSComponent } from 'src/app/shared/components/custom-input/custom-inputEstudiante_MS.component';
import { LogoEstudianteMSComponent } from 'src/app/shared/components/logo/logoEstudiante_MS.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateCitaEstudianteMSComponent } from 'src/app/shared/components/add-update-cita/add-update-citaEstudiante_MS.component';
import { AddUpdateCitaDentistaEstudianteMSComponent } from 'src/app/shared/components/add-update-cita-dentista/add-update-cita-dentistaEstudiante_MS.component';
import { AddUpdateCitaFisioterapiaEstudianteMSComponent } from 'src/app/shared/components/add-update-cita-fisioterapia/add-update-cita-fisioterapiaEstudiante_MS.component';
import { AddUpdateCitaOculistaEstudianteMSComponent } from 'src/app/shared/components/add-update-cita-oculista/add-update-cita-oculistaEstudiante_MS.component';

@NgModule({
  declarations: [
    HeaderEstudianteMSComponent,
    CustomInputEstudianteMSComponent,
    LogoEstudianteMSComponent,
    AddUpdateCitaEstudianteMSComponent,
    AddUpdateCitaDentistaEstudianteMSComponent,
    AddUpdateCitaOculistaEstudianteMSComponent,
    AddUpdateCitaFisioterapiaEstudianteMSComponent
  ],
  exports: [
    HeaderEstudianteMSComponent,
    CustomInputEstudianteMSComponent,
    LogoEstudianteMSComponent,
    ReactiveFormsModule,
    FormsModule,
    AddUpdateCitaEstudianteMSComponent,
    AddUpdateCitaDentistaEstudianteMSComponent,
    AddUpdateCitaOculistaEstudianteMSComponent,
    AddUpdateCitaFisioterapiaEstudianteMSComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }

