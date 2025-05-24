import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioPageRoutingModule } from './horarioEstudiante_MS-routing.module';

import { HorarioPage } from './horarioEstudiante_MS.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioPageRoutingModule,
    SharedModule
  ],
  declarations: [HorarioPage]
})
export class HorarioPageModule {}
