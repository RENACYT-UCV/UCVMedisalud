import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomePage } from './welcomeEstudiante_MS.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/authEstudiante_MS.module').then( m => m.AuthPageModule)
  },
  {
    path: 'captcha',
    loadChildren: () => import('./captcha/captchaEstudiante_MS.module').then( m => m.CaptchaPageModule)
  },
  



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePageRoutingModule {}
