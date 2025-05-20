import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorarioPage } from './horarioEstudiante_MS.page';
import { AddUpdateCitaOculistaEstudianteMSComponent } from 'src/app/shared/components/add-update-cita-oculista/add-update-cita-oculistaEstudiante_MS.component';

const routes: Routes = [
  {
    path: '',
    component: HorarioPage
  },
  {
    path: 'add-update-cita-oculista/:hora',
    component: AddUpdateCitaOculistaEstudianteMSComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioPageRoutingModule {}
