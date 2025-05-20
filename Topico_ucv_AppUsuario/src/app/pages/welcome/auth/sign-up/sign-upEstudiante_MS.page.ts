import { FirebaseApp } from '@angular/fire/compat';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user_ETD } from 'src/app/models/user.model';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';

@Component({
  selector: 'app-sign-up-student',
  templateUrl: './sign-upEstudiante_MS.page.html',
  styleUrls: ['./sign-upEstudiante_MS.page.scss'],
})
export class SignUpPage implements OnInit {

  carre: string[] = [
  'Ingeniería','Medicina','Administración y Administración Pública',
  'Arquitectura','Moda y Diseño','Comercio y Relaciones Internacionales',
  'Comunicación, Periodismo, Ciencias de la Información','Contabilidad',
  'Derecho y Leyes','Educación y Pedagogía','Hotelería, Gastronomía y Turismo'];

  form = new FormGroup({
    uid: new FormControl(''),
    hotm: new FormControl('', [Validators.required, Validators.email]),
    cont: new FormControl('', [Validators.required]),
    nom: new FormControl('',[Validators.required, Validators.minLength(4)]),
    fono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    identific: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    carre: new FormControl('', [Validators.required]), 
    role: new FormControl('student', [Validators.required]) 
  });


  firebaseSvc = inject(FirebaseEDTService);
  utilsSvc= inject(UtilsEDTService)

  ngOnInit() {
  }

  async submit() {
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as user_ETD).then(async res =>{
        await this.firebaseSvc.updateUser(this.form.value.nom);

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid)
      }).catch(error=>{
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color:'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
  }

  async setUserInfo(uid:string) {
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `user/${uid}`; 
      delete this.form.value.cont;

      this.firebaseSvc.setDocument(path, this.form.value).then(async res =>{
        this.utilsSvc.saveInLocalStorage('user',this.form.value)
        this.utilsSvc.routerLink('/main/home');
        this.form.reset();
      }).catch(error=>{
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color:'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
  }
}
