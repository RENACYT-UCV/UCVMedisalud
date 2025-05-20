import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorarioPage } from './horarioEstudiante_MS.page';
import { AddUpdateCitaDentistaEstudianteMSComponent } from 'src/app/shared/components/add-update-cita-dentista/add-update-cita-dentistaEstudiante_MS.component';
const routes: Routes = [
  {
    path: '',
    component: HorarioPage
  },
  {
    path: 'add-update-cita-dentista/:hora',
    component: AddUpdateCitaDentistaEstudianteMSComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioPageRoutingModule {}
