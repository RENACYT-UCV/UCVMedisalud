import { FirebaseApp } from '@angular/fire/compat';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user_ETD } from 'src/app/models/user.model';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';
import { Cita} from 'src/app/models/cita.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profileEstudiante_MS.page.html',
  styleUrls: ['./profileEstudiante_MS.page.scss'],
})
export class ProfilePage implements OnInit {

  firebaseSvc = inject(FirebaseEDTService);
  utilsSvc= inject(UtilsEDTService)


  ngOnInit() {
  }

  user(): user_ETD {
    return this.utilsSvc.getFromLocalStorage('user');
  }

 //=========Tomar / seleccionar imagenes==================
 async takeImage(){
  // variable local
  let user = this.user();
  let path = `user/${user.uid}`

  

  const dataUrl = (await this.utilsSvc.takePicture('imagen del perfil')).dataUrl;

  
  const loading = await this.utilsSvc.loading();
  await loading.present();


  let imagePath = `${user.uid}/profile`;
  user.fotogra = await this.firebaseSvc.uploadImage(imagePath,dataUrl);

  this.firebaseSvc.updateDocument(path,{image: user.fotogra}).then(async res =>{
 
    this.utilsSvc.saveInLocalStorage('user' , user);
    this.utilsSvc.presentToast({
      message: 'foto de perfil actualizado exitosamente',
      duration: 1500,
      color:'success',
      position: 'middle',
      icon: 'checkmark-circle-outline'
    })


  }).catch(error=>{
    console.log(error);

    this.utilsSvc.presentToast({
      message:'no se subio papi',
      duration: 2500,
      color:'#003B5C',
      position: 'middle',
      icon: 'alert-circle-outline'
    })

  }).finally(()=>{
    loading.dismiss();
  })

 
 }
}
