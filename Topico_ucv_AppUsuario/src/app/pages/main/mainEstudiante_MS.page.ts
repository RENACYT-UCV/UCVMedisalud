import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { user_ETD } from 'src/app/models/user.model';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';

@Component({
  selector: 'app-main',
  templateUrl: './mainEstudiante_MS.page.html',
  styleUrls: ['./mainEstudiante_MS.page.scss'],
})
export class MainPage implements OnInit {

  pages =[
    {title:'Perfil',url:'/main/profile',icon:'person-outline'},
    {title:'Gestion',url:'/main/gestion',icon:'person-outline'},
    {title:'Citas Concluidas',url:'/main/cita-concluida',icon: 'medical-outline'},
    {title:'Citas Pendientes',url:'/main/cita-pendiente',icon: 'medical-outline'},
    
]

 router = inject(Router);
 firebaseSvc = inject(FirebaseEDTService);
 utilsSvc = inject(UtilsEDTService);


 currentPath: string ='';


  ngOnInit() {
    this.router.events.subscribe((event: any)=>{
      if(event?.url) this.currentPath = event.url;
    })
  }


  user(): user_ETD {
    return this.utilsSvc.getFromLocalStorage('users');
  }


//cerrar sesion
  singOut(){
    this.firebaseSvc.sigOut();
  }

}
