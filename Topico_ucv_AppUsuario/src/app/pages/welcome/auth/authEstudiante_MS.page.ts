import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user_ETD } from 'src/app/models/user.model';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';

@Component({
  selector: 'app-auth',
  templateUrl: './authEstudiante_MS.page.html',
  styleUrls: ['./authEstudiante_MS.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  firebaseSvc = inject(FirebaseEDTService);
  utilsSvc = inject(UtilsEDTService);

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as user_ETD).then(res => {
        console.log(res);
        this.getUserInfo(res.user.uid);
      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: "Usuario o Contraseña Incorrectos",
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const path = `user/${uid}`;

      this.firebaseSvc.getDocument(path).then((user: user_ETD) => {
        if (user.role === 'student') {
          this.utilsSvc.saveInLocalStorage('user', user);
          this.utilsSvc.routerLink('/main/gestion');
          this.form.reset();

          this.utilsSvc.presentToast({
            message: `Te damos la Bienvenida ${user.name}`,
            duration: 1500,
            color: 'primary',
            position: 'middle',
            icon: 'person-circle-outline'
          });
        } else {
          this.utilsSvc.presentToast({
            message: "Acceso denegado. Solo los estudiantes tienen acceso.",
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline'
          });
        }
      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: "No se pudo guardar la información",
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }
}
