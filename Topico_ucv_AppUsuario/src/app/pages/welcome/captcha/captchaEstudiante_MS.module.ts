import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaptchaPageRoutingModule } from './captchaEstudiante_MS-routing.module';

import { CaptchaPage } from './captchaEstudiante_MS.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaptchaPageRoutingModule
  ],
  declarations: [CaptchaPage]
})
export class CaptchaPageModule {}
