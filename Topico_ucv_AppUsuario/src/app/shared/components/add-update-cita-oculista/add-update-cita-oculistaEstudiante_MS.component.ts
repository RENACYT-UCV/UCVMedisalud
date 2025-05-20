import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user_ETD } from 'src/app/models/user.model';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';
import { Cita } from 'src/app/models/cita.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-add-update-cita-oculista-estudiante-ms',
  templateUrl: './add-update-cita-oculistaEstudiante_MS.component.html',
  styleUrls: ['./add-update-cita-oculistaEstudiante_MS.component.scss'],
})
export class AddUpdateCitaOculistaEstudianteMSComponent implements OnInit {

  @Input() cita: Cita;

  // Define el formulario con todos los controles necesarios
  form = new FormGroup({
    id: new FormControl(''),
    fotogra: new FormControl(''),
    nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    identific: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    cos: new FormControl(null),
    fec: new FormControl(null, Validators.required),
    tim: new FormControl(null, Validators.required),
    med: new FormControl(null, Validators.required),
    di: new FormControl(null, Validators.required),

    carre: new FormControl(null, Validators.required),
    tip: new FormControl('Oculista'),
    sold: new FormControl(null, Validators.required),
    hotm: new FormControl(null, [Validators.required, Validators.email]),
  });

  user = {} as user_ETD;
  doctors: string[] = ['Dr. Luis Martinez', 'Dra. Jade Herrera'];
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
        this.form.controls.tim.setValue(selectedHour);
      }
      if (selectedDate) {
        // Convertir la fecha a la zona horaria de Lima usando moment-timezone
        const dateInLimaTimezone = moment.tz(selectedDate, 'America/Lima').toDate();
        this.form.controls.fec.setValue(dateInLimaTimezone);
      }
    });
  }

  setUserDetails() {
    this.form.controls.nom.setValue(this.user.nom);
    this.form.controls.identific.setValue(this.user.identific);
    this.form.controls.sold.setValue(this.user.fono);
    this.form.controls.carre.setValue(this.user.carre);
    this.form.controls.hotm.setValue(this.user.hotm);
  }

  async takeImage() {
    try {
      const dataUrl = (await this.utilsSvc.takePicture('imagen a cargar')).dataUrl;
      this.form.controls.fotogra.setValue(dataUrl);
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
    let { sold, cos } = this.form.controls;
    if (sold.value) sold.setValue(parseFloat(sold.value));
    if (cos.value) cos.setValue(parseFloat(cos.value));
  }

  async createCita() {
    const path = `Estudiantes/${this.user.uid}/cita`;
    const loading = await this.utilsSvc.loading();
    await loading.present();

    try {
      if (this.form.value.fotogra) {
        const imageUrl = await this.uploadImage();
        this.form.controls.fotogra.setValue(imageUrl);
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
    const path = `Estudiante/${this.user.uid}/cita_oculista/${this.cita.id}`;
    const loading = await this.utilsSvc.loading();
    await loading.present();

    try {
      if (this.form.value.fotogra !== this.cita.fotogra && this.form.value.fotogra) {
        const imageUrl = await this.uploadImage();
        this.form.controls.fotogra.setValue(imageUrl);
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
    const dataUrl = this.form.value.fotogra;
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

  // Validador personalizado para asegurar que la fecha seleccionada no sea en el pasado
  validateDate(control: FormControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return { pastDate: true };
    }
    return null;
  }

  updateFechaFromDia() {
    const selectedDay = this.form.value.di;
    const today = new Date();
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const todayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const targetDayIndex = days.findIndex(day => day.toLowerCase() === selectedDay.toLowerCase());
    
    if (targetDayIndex !== -1) {
        let nextDate = new Date(today);
        let dayDifference = targetDayIndex - todayIndex;
        
        if (dayDifference < 0) {
            dayDifference += 7; // Add 7 days if the selected day has already passed this week
        }
        
        nextDate.setDate(today.getDate() + dayDifference);
        
        // Format the date as YYYY-MM-DD (input type="date" format)
        const formattedDate = nextDate.toISOString().substring(0, 10);
        this.form.controls.fec.setValue(formattedDate);
    }
}
}
