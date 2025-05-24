import { Component, Input, OnInit, inject } from '@angular/core';
import { UtilsService_Image } from 'src/app/services/utils_Image.service';
// import { FirebaseService_Datos } from 'src/app/services/firebase_Datos.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  // firebaseSvc = inject(FirebaseService_Datos);


 @Input() isModal!:boolean;
 @Input() showMenu!:boolean;
 @Input() title!:string;
 @Input() backButton!: string;


 utilSvc = inject(UtilsService_Image);


  ngOnInit() {}

  // user() {
  //   return this.utilSvc.getFromLocalStorage('administrador');
  // }


  dismissModal(){
    this.utilSvc.dismissModal();
  }

}
