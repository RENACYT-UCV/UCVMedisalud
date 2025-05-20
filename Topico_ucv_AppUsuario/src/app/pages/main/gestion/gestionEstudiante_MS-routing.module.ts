import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionPage } from './gestionEstudiante_MS.page';

const routes: Routes = [
  {
    path: '',
    component: GestionPage
  },
  {
    path: 'doc',
    loadChildren: () => import('./doc/docEstudiante_MS.module').then( m => m.DocPageModule)
  },
  {
    path: 'doc_fisio',
    loadChildren: () => import('./doc_fisio/docEstudiante_MS.module').then( m => m.DocPageModule)
  },
  {
    path: 'doc_Dentista',
    loadChildren: () => import('./doc_Dentista/docEstudiante_MS.module').then( m => m.DocPageModule)
  },
  {
    path: 'doc_oculista',
    loadChildren: () => import('./doc_oculista/docEstudiante_MS.module').then( m => m.DocPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionPageRoutingModule {}
