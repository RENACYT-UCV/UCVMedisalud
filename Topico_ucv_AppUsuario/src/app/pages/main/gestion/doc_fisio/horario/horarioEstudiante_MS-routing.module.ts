import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorarioPage } from './horarioEstudiante_MS.page';
import { AddUpdateCitaFisioterapiaEstudianteMSComponent } from 'src/app/shared/components/add-update-cita-fisioterapia/add-update-cita-fisioterapiaEstudiante_MS.component';

const routes: Routes = [
  {
    path: '',
    component: HorarioPage
  },
  {
    path: 'add-update-cita-fisioterapia/:hora',
    component: AddUpdateCitaFisioterapiaEstudianteMSComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioPageRoutingModule {}
