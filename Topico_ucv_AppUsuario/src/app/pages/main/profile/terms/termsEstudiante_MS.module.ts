import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsPageRoutingModule } from './termsEstudiante_MS-routing.module';

import { TermsPage } from './termsEstudiante_MS.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsPageRoutingModule
  ],
  declarations: [TermsPage]
})
export class TermsPageModule {}
