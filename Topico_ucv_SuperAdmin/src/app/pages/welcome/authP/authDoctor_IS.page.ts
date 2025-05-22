import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseApp } from '@angular/fire/compat';
import { User } from 'firebase/auth';
import { user_Estructura } from 'src/app/models/user_Estructura.model';
import { FirebaseService_Datos } from 'src/app/services/firebase_Datos.service';
import { UtilsService_Image } from 'src/app/services/utils_Image.service';

@Component({
  selector: 'app-authDoctor_IS',
  templateUrl: './authDoctor_IS.page.html',
  styleUrls: ['./authDoctor_IS.page.scss'],
})

export class AuthDoctor_ISPage implements OnInit {
  showPassword: boolean = true;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  firebaseSvc = inject(FirebaseService_Datos);
  utilsSvc= inject(UtilsService_Image)
  togglePassword() {
  this.showPassword = !this.showPassword;
}

  ngOnInit() {
  }

  async submit() {
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as user_Estructura).then(res =>{
        console.log(res);
        this.getUserInfo(res.user.uid);
      }).catch(error=>{
        console.log(error);

        this.utilsSvc.presentToast({
          message:"Usuario o Contraseña Incorrectos",
          duration: 2500,
          color:'dark',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
  }

  async getUserInfo(uid:string) {
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `administrador/${uid}`;

      this.firebaseSvc.getDocument(path).then((user:user_Estructura) =>{
        if(user.role === 'administrador') { // Verificar si el usuario es admin
          this.utilsSvc.saveInLocalStorage('administrador',user)
          this.utilsSvc.routerLink('/main-p/UserUsuario');
          this.form.reset();

          this.utilsSvc.presentToast({
            message: `Bienvenido a nuestra app : ${user.name}`,
            duration: 1500,
            color:'dark',
            position: 'middle',
          })
        } else {
          this.utilsSvc.presentToast({
            message: "Acceso denegado. Solo los administradores pueden acceder.",
            duration: 2500,
            color:'dark',
            position: 'middle',
            icon: 'alert-circle-outline'
          })
        }
      }).catch(error=>{
        console.log(error);

        this.utilsSvc.presentToast({
          message: "no se pudo guardar la informacion , contacte con soporte tecnico",
          duration: 2500,
          color:'dark',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
  }
}
