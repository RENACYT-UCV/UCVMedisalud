import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user_ETD } from 'src/app/models/user.model';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';
import { Cita } from 'src/app/models/cita.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { where } from 'firebase/firestore';
import { DoctorService } from 'src/app/services/doctor_service';


@Component({
  selector: 'app-add-update-cita-dentista-estudiante-ms',
  templateUrl: './add-update-cita-dentistaEstudiante_MS.component.html',
  styleUrls: ['./add-update-cita-dentistaEstudiante_MS.component.scss'],
})
export class AddUpdateCitaDentistaEstudianteMSComponent implements OnInit {

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
    type: new FormControl('odontologia'),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{2}$')])
  });

  user = {} as user_ETD;
  doctors: string[] = [];
  dias: { nombre: string, valor: string }[] = [
    { nombre: 'Lunes', valor: 'Lunes' },
    { nombre: 'Martes', valor: 'Martes' },
    { nombre: 'Miércoles', valor: 'Miércoles' },
    { nombre: 'Jueves', valor: 'Jueves' },
    { nombre: 'Viernes', valor: 'Viernes' },
    { nombre: 'Sábado', valor: 'Sábado' },
  ];
doctorSeleccionado: string;

  constructor(
    private firebaseSvc: FirebaseEDTService,
    private utilsSvc: UtilsEDTService,
    private route: ActivatedRoute,
    private router: Router,
        private doctorService: DoctorService,
    
  ) {}

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    
    // Cargar lista de doctores disponibles
 const doctor = this.doctorService.getDoctorSeleccionado();
  if (doctor) {
    this.doctorSeleccionado = doctor.name;
    this.form.controls.doctor.setValue(this.doctorSeleccionado);
  }
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

  cargarDoctoresDisponibles() {
    try {
      // Obtener doctores desde Firestore según la especialidad
      this.firebaseSvc.getCollecitionData('user', [
        where('role', '==', 'admin'),
        where('especialidad', '==', 'odontologia')
      ]).subscribe(doctoresRef => {
        if (Array.isArray(doctoresRef)) {
          this.doctors = doctoresRef.map(doc => doc['name']);
          
          if (this.doctors.length === 0) {
            console.warn('No hay doctores disponibles para esta especialidad');
            this.utilsSvc.presentToast({
              message: 'No hay doctores disponibles para esta especialidad.',
              duration: 3000,
              color: 'warning',
              position: 'middle'
            });
          } else {
            // Obtener el doctor seleccionado de los parámetros de la ruta
            const selectedDoctor = this.route.snapshot.paramMap.get('doctor');
            if (selectedDoctor && this.doctors.includes(selectedDoctor)) {
              this.form.controls.doctor.setValue(selectedDoctor);
            } else {
              // Si no hay doctor seleccionado o no está en la lista, seleccionar el primero
              this.form.controls.doctor.setValue(this.doctors[0]);
            }
          }
        } else {
          throw new Error('Error al obtener datos de doctores');
        }
      }, error => {
        console.error('Error al cargar doctores:', error);
        this.utilsSvc.presentToast({
          message: 'Error al cargar la lista de doctores. Por favor, inténtelo de nuevo más tarde.',
          duration: 3000,
          color: 'danger',
          position: 'middle'
        });
        this.doctors = [];
      });
    } catch (error) {
      console.error('Error al iniciar carga de doctores:', error);
      this.utilsSvc.presentToast({
        message: 'Error al cargar la lista de doctores. Por favor, inténtelo de nuevo más tarde.',
        duration: 3000,
        color: 'danger',
        position: 'middle'
      });
      this.doctors = [];
    }
  }

  preseleccionarDoctor() {
    if (this.doctors.length > 0) {
      // Seleccionar el primer doctor disponible por defecto
      this.form.controls.doctor.setValue(this.doctors[0]);
    }
  }

  setUserDetails() {
    this.form.controls.name.setValue(this.user.name);
    this.form.controls.dni.setValue(this.user.dni);
    this.form.controls.phone.setValue(this.user.phone);
    this.form.controls.facultad.setValue(this.user.facultad);
    this.form.controls.email.setValue(this.user.email);
    
    // Autocompletar edad si está disponible en el usuario
    if (this.user.edad) {
      this.form.controls.age.setValue(this.user.edad);
    }

    // Preseleccionar doctor basado en la disponibilidad
    this.preseleccionarDoctor();
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
    const path = `Estudiantes/${this.user.uid}/cita/${this.cita.id}`;
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
      this.router.navigate(['/main/gestion']);
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
    const todayIndex = today.getDay();
    const targetDayIndex = days.findIndex(day => day.toLowerCase() === selectedDay.toLowerCase());

    if (targetDayIndex !== -1) {
      let nextDate = new Date(today);
      let dayDifference = targetDayIndex - todayIndex;
      if (dayDifference < 0) dayDifference += 7;
      nextDate.setDate(today.getDate() + dayDifference);
      const formattedDate = nextDate.toISOString().substring(0, 10);
      this.form.controls.date.setValue(formattedDate);
    }
  }
}
