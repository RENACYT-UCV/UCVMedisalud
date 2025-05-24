import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { Cita } from 'src/app/models/cita.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';

@Component({
  selector: 'app-add-update-cita',
  templateUrl: './add-update-cita.component.html',
  styleUrls: ['./add-update-cita.component.scss'],
})
export class AddUpdateCitaComponent implements OnInit {
  @Input() cita: Cita;

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    price: new FormControl(null),
    date: new FormControl(null, [Validators.required, this.validateDate]),
    time: new FormControl(null, Validators.required),
    doctor: new FormControl(null, Validators.required),
    facultad: new FormControl(null, Validators.required),
    type: new FormControl('Psicología'),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  user = {} as user;
  doctors: string[] = [];

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: Camara_utilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    await this.cargarDoctoresDisponibles();

    if (this.cita) {
      this.form.patchValue(this.cita);
    } else {
      this.setUserDetails();
    }

    this.route.paramMap.subscribe(params => {
      const selectedDoctor = params.get('doctor');
      if (selectedDoctor) {
        this.form.controls.doctor.setValue(selectedDoctor);
      }
      const selectedHour = params.get('hora');
      if (selectedHour) {
        this.form.controls.time.setValue(selectedHour);
      }
    });
  }

  async cargarDoctoresDisponibles() {
    try {
      const doctor = this.route.snapshot.paramMap.get('doctor');
      if (doctor) {
        this.doctors = [doctor];
      } else {
        this.utilsSvc.presentToast({
          message: 'No se pudo cargar el doctor seleccionado',
          duration: 2500,
          color: '#003B5C',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }
    } catch (error) {
      console.error('Error al cargar doctores:', error);
      this.utilsSvc.presentToast({
        message: 'Error al cargar los doctores disponibles',
        duration: 2500,
        color: '#003B5C',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    }
  }
setNumberInputs() {
  const { price, phone } = this.form.controls;
  if (price.value) price.setValue(parseFloat(price.value));
  if (phone && phone.value) phone.setValue(String(phone.value)); // si necesitas asegurar que phone sea string o número
}

  setUserDetails() {
    this.form.controls.name.setValue(this.user.name);
    this.form.controls.dni.setValue(this.user.dni);
    this.form.controls.phone.setValue(this.user.phone);
    this.form.controls.facultad.setValue(this.user.facultad);
    this.form.controls.email.setValue(this.user.email);
  }

  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('imagen a cargar')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  submit() {
    if (this.form.valid) {
      if (this.cita) this.updateCita();
      else this.createCita();
    }
  }

  async createCita() {
    const path = `Estudiantes/${this.user.uid}/cita`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    if (this.form.value.image) {
      const dataUrl = this.form.value.image;
      const imagePath = `${this.user.uid}/${Date.now()}`;
      const imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);
    }

    const formValue = { ...this.form.value };
    delete formValue.id;

    this.firebaseSvc.addDocument(path, formValue).then(async () => {
      this.utilsSvc.dismissModal({ success: true });

      this.utilsSvc.presentToast({
        message: 'Cita creada exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      });

      this.router.navigate(['/main/gestion']);
    }).catch(error => {
      console.error(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: '#003B5C',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    }).finally(() => {
      loading.dismiss();
    });
  }

  async updateCita() {
    const path = `Estudiantes/${this.user.uid}/cita/${this.cita.id}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    if (this.form.value.image !== this.cita.image && this.form.value.image) {
      const dataUrl = this.form.value.image;
      const imagePath = await this.firebaseSvc.getFilepath(this.cita.image);
      const imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);
    }

    const formValue = { ...this.form.value };
    delete formValue.id;

    this.firebaseSvc.updateDocument(path, formValue).then(async () => {
      this.utilsSvc.dismissModal({ success: true });

      this.utilsSvc.presentToast({
        message: 'Cita actualizada exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      });

      this.router.navigate(['/ruta-deseada']);
    }).catch(error => {
      console.error(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: '#003B5C',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    }).finally(() => {
      loading.dismiss();
    });
  }

  validateDate(control: FormControl) {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate < today ? { pastDate: true } : null;
  }
}
