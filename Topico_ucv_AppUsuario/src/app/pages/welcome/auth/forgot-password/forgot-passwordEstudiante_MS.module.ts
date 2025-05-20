import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-passwordEstudiante_MS-routing.module';

import { ForgotPasswordPage } from './forgot-passwordEstudiante_MS.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule,
    SharedModule
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
