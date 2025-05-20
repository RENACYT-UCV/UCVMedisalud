import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './mainEstudiante_MS.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children:[
 
      {
        path: 'profile',loadChildren: () => import('./profile/profileEstudiante_MS.module').then( m => m.ProfilePageModule)
      },

      { path: 'gestion', loadChildren: () => import('./gestion/gestionEstudiante_MS.module').then(m => m.GestionPageModule) },

      { path: 'cita-concluida', loadChildren: () => import('./cita-concluida/cita-concluidaEstudiante_MS.module').then(m => m.CitaConcluidaPageModule) },

      { path: 'cita-pendiente', loadChildren: () => import('./cita-pendiente/cita-pendienteEstudiante_MS.module').then(m => m.CitaPendientePageModule)},

  

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}