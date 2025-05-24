import { Component, Input, OnInit, inject } from '@angular/core';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';
// import { FirebaseApp } from '@angular/fire/compat';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
// import { user } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

 @Input() isModal!:boolean;
 @Input() showMenu!:boolean;
 @Input() title!:string;
 @Input() backButton!: string;
 //== parametro para que se muestre el boton

  utilSvc = inject(Camara_utilsService);
  firebaseSvc = inject(FirebaseService);



  ngOnInit() {}

  // user(): user {
  //   return this.utilSvc.getFromLocalStorage('user');
  // }


  dismissModal(){
    this.utilSvc.dismissModal();
  }

}
