import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user_ETD } from 'src/app/models/user.model';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';
import { Cita } from 'src/app/models/cita.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-add-update-cita-fisioterapeuta-estudiante-ms',
  templateUrl: './add-update-cita-fisioterapiaEstudiante_MS.component.html',
  styleUrls: ['./add-update-cita-fisioterapiaEstudiante_MS.component.scss'],
})
export class AddUpdateCitaFisioterapiaEstudianteMSComponent implements OnInit {

  @Input() cita: Cita;

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    price: new FormControl(null),
    date: new FormControl(null, Validators.required),
    time: new FormControl(null, Validators.required),
    doctor: new FormControl(null, Validators.required),
    day: new FormControl(null, Validators.required),
    facultad: new FormControl(null, Validators.required),
    type: new FormControl('Fisioterapeuta'),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{2}$')])
  });

  user = {} as user_ETD;
  doctors: string[] = ['Dra. Ana Antunez', 'Dr. Marcelo Quispe'];
  dias: { nombre: string, valor: string }[] = [
    { nombre: 'Lunes', valor: 'Lunes' },
    { nombre: 'Martes', valor: 'Martes' },
    { nombre: 'Miércoles', valor: 'Miércoles' },
    { nombre: 'Jueves', valor: 'Jueves' },
    { nombre: 'Viernes', valor: 'Viernes' },
    { nombre: 'Sábado', valor: 'Sábado' },
  ];

  constructor(
    private firebaseSvc: FirebaseEDTService,
    private utilsSvc: UtilsEDTService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');

    if (this.cita) {
      this.form.setValue(this.cita);
    } else {
      this.setUserDetails();
    }

    this.route.paramMap.subscribe(params => {
      const selectedHour = params.get('hora');
      const selectedDate = params.get('fecha');
      if (selectedHour) {
        this.form.controls.time.setValue(selectedHour);
      }
      if (selectedDate) {
        const dateInLimaTimezone = moment.tz(selectedDate, 'America/Lima').toDate();
        this.form.controls.date.setValue(dateInLimaTimezone);
      }
    });
  }

  setUserDetails() {
    this.form.controls.name.setValue(this.user.name);
    this.form.controls.dni.setValue(this.user.dni);
    this.form.controls.phone.setValue(this.user.phone);
    this.form.controls.facultad.setValue(this.user.facultad);
    this.form.controls.email.setValue(this.user.email);
  }

  async takeImage() {
    try {
      const dataUrl = (await this.utilsSvc.takePicture('imagen a cargar')).dataUrl;
      this.form.controls.image.setValue(dataUrl);
    } catch (error) {
      console.error('Error taking image', error);
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.cita) {
        this.updateCita();
      } else {
        this.createCita();
      }
    }
  }

  setNumberInputs() {
    let { phone, price } = this.form.controls;
    if (phone.value) phone.setValue(parseFloat(phone.value));
    if (price.value) price.setValue(parseFloat(price.value));
  }

  async createCita() {
    const path = `Estudiantes/${this.user.uid}/cita`;
    const loading = await this.utilsSvc.loading();
    await loading.present();

    try {
      if (this.form.value.image) {
        const imageUrl = await this.uploadImage();
        this.form.controls.image.setValue(imageUrl);
      }

      delete this.form.value.id;
      await this.firebaseSvc.addDocument(path, this.form.value);
      this.utilsSvc.dismissModal({ success: true });
      this.presentToast('Cita creada exitosamente', 'success');
      this.router.navigate(['/main/gestion']);
    } catch (error) {
      console.error('Error creando cita', error);
      this.presentToast(error.message, 'danger');
    } finally {
      loading.dismiss();
    }
  }

  async updateCita() {
    const path = `Estudiantes/${this.user.uid}/cita_fisioterapia/${this.cita.id}`;
    const loading = await this.utilsSvc.loading();
    await loading.present();

    try {
      if (this.form.value.image !== this.cita.image && this.form.value.image) {
        const imageUrl = await this.uploadImage();
        this.form.controls.image.setValue(imageUrl);
      }

      delete this.form.value.id;
      await this.firebaseSvc.updateDocument(path, this.form.value);
      this.utilsSvc.dismissModal({ success: true });
      this.presentToast('Cita actualizada exitosamente', 'success');
      this.router.navigate(['/ruta-deseada']);
    } catch (error) {
      console.error('Error actualizando cita', error);
      this.presentToast(error.message, 'danger');
    } finally {
      loading.dismiss();
    }
  }

  async uploadImage() {
    const dataUrl = this.form.value.image;
    const imagePath = `${this.user.uid}/${Date.now()}`;
    return await this.firebaseSvc.uploadImage(imagePath, dataUrl);
  }

  presentToast(message: string, color: 'success' | 'danger') {
    this.utilsSvc.presentToast({
      message,
      duration: 1500,
      color,
      position: 'middle',
      icon: color === 'success' ? 'checkmark-circle-outline' : 'alert-circle-outline',
    });
  }

  validateDate(control: FormControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today ? { pastDate: true } : null;
  }

  updateFechaFromDia() {
  const selectedDay = this.form.value.day; 
  const today = new Date();
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const jsDay = today.getDay(); // 0 (Domingo) - 6 (Sábado)
  const todayIndex = jsDay === 0 ? 6 : jsDay - 1;
  const targetDayIndex = days.findIndex(day => day.toLowerCase() === selectedDay.toLowerCase());
  if (targetDayIndex !== -1) {
    let nextDate = new Date(today);
    let dayDifference = targetDayIndex - todayIndex;
    if (dayDifference < 0) {
      dayDifference += 7;
    }
    nextDate.setDate(today.getDate() + dayDifference);
    const formattedDate = nextDate.toISOString().substring(0, 10);
    this.form.controls.date.setValue(formattedDate); 
    }
  }
}
