import { FirebaseApp } from '@angular/fire/compat';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { Cita} from 'src/app/models/cita.model';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';
@Component({
  selector: 'app-Perfil_Doctor_Cam-doctor',
  templateUrl: './Perfil_Doctor_Cam.page.html',
  styleUrls: ['./Perfil_Doctor_Cam.page.scss'],
})
export class Perfil_Doctor_CamPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc= inject(Camara_utilsService)


  ngOnInit() {
  }

  user(): user {
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
  user.image = await this.firebaseSvc.uploadImage(imagePath,dataUrl);

  this.firebaseSvc.updateDocument(path,{image: user.image}).then(async res =>{
 
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
