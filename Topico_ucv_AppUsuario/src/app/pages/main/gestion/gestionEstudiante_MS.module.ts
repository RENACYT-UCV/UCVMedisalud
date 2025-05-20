import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionPageRoutingModule } from './gestionEstudiante_MS-routing.module';

import { GestionPage } from './gestionEstudiante_MS.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionPageRoutingModule,
    SharedModule
  ],
  declarations: [GestionPage]
})
export class GestionPageModule {}
