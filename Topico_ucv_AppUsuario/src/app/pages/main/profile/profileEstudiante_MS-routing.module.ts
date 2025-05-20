import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profileEstudiante_MS.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  { path: 'terms', loadChildren: () => import('./terms/termsEstudiante_MS.module').then(m => m.TermsPageModule) },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
