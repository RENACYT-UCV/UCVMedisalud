import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user_ETD } from 'src/app/models/user.model';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';
import { FirebaseApp } from '@angular/fire/compat';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-forgot-password-student',
  templateUrl: './forgot-passwordEstudiante_MS.page.html',
  styleUrls: ['./forgot-passwordEstudiante_MS.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  form = new FormGroup({
    hotm: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSvc = inject(FirebaseEDTService);
  utilSvc = inject(UtilsEDTService);

  ngOnInit() {}
  async submit() {
    if (this.form.valid) {
      const loading = await this.utilSvc.loading();
      await loading.present();

      this.firebaseSvc
        .sendRecoveryEmail(this.form.value.hotm)
        .then(() => {
          this.utilSvc.presentToast({
            message: 'Correo enviado con éxito',
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'mail-outline',
          });
          this.form.reset();
          this.utilSvc.routerLink('/auth'); // O usa this.router.navigate(['/auth']);
        })
        .catch((error) => {
          console.log(error);
          this.utilSvc.presentToast({
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
