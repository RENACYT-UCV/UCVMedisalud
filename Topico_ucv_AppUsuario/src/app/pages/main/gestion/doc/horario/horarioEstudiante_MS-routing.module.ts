import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorarioPage } from './horarioEstudiante_MS.page';
import { AddUpdateCitaEstudianteMSComponent } from 'src/app/shared/components/add-update-cita/add-update-citaEstudiante_MS.component'; 

const routes: Routes = [
  {
    path: '',
    component: HorarioPage
  },
  {
    path: 'add-update-cita/:hora',
    component: AddUpdateCitaEstudianteMSComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioPageRoutingModule {}
