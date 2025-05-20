import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CitaPendientePageRoutingModule } from './cita-pendienteEstudiante_MS-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CitaPendientePage } from './cita-pendienteEstudiante_MS.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitaPendientePageRoutingModule,
    SharedModule
  ],
  declarations: [CitaPendientePage]
})
export class CitaPendientePageModule {}
