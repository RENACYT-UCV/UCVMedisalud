import { Component, Input, OnInit, inject } from '@angular/core';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';

@Component({
  selector: 'app-header-estudiante-ms',
  templateUrl: './headerEstudiante_MS.component.html',
  styleUrls: ['./headerEstudiante_MS.component.scss'],
})
export class HeaderEstudianteMSComponent  implements OnInit {

 @Input() isModal!:boolean;
 @Input() showMenu!:boolean;
 @Input() title!:string;
 @Input() backButton!: string;
 //== parametro para que se muestre el boton

 utilSvc = inject(UtilsEDTService);

  

  ngOnInit() {}

  dismissModal(){
    this.utilSvc.dismissModal();
  }

}
