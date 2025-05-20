import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocPage } from './docEstudiante_MS.page';

const routes: Routes = [
  {
    path: '',
    component: DocPage
  },
  {
    path: 'horario',
    loadChildren: () => import('./horario/horarioEstudiante_MS.module').then( m => m.HorarioPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocPageRoutingModule {}
