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
    'Ingeniería',
    'Medicina',
    'Administración y Administración Pública',
    'Arquitectura',
    'Moda y Diseño',
    'Comercio y Relaciones Internacionales',
    'Comunicación, Periodismo, Ciencias de la Información',
    'Contabilidad',
    'Derecho y Leyes',
    'Educación y Pedagogía',
    'Hotelería, Gastronomía y Turismo',
  ];

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]),
    dni: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    facultad: new FormControl('', [Validators.required]),
    edad: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{2}$'),
    ]),
    role: new FormControl('student', [Validators.required]),
  });

  firebaseSvc = inject(FirebaseEDTService);
  utilsSvc = inject(UtilsEDTService);

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc
        .signUp(this.form.value as user_ETD)
        .then(async (res) => {
          await this.firebaseSvc.updateUser(this.form.value.name);

          const uid = res.user.uid;
          this.form.controls.uid.setValue(uid);

          this.setUserInfo(uid);
        })
        .catch((error) => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }

  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const path = `user/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc
        .setDocument(path, this.form.value)
        .then(async (res) => {
          this.utilsSvc.saveInLocalStorage('user', this.form.value);
          this.form.reset();

          this.utilsSvc.presentToast({
            message: 'Registro exitoso. Inicia sesión para continuar.',
            duration: 2000,
            color: 'success',
            position: 'middle',
            icon: 'checkmark-circle-outline',
          });

          this.utilsSvc.routerLink('/auth'); // 🔁 Redirige al login
        })
        .catch((error) => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }
}
