import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { Cita } from 'src/app/models/cita.model';
import { ActivatedRoute } from '@angular/router';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';

@Component({
  selector: 'app-add-update-cita-oculista',
  templateUrl: './add-update-cita-oculista.component.html',
  styleUrls: ['./add-update-cita-oculista.component.scss'],
})
export class AddUpdateCitaOculistaComponent implements OnInit {

  @Input() cita: Cita;

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl(''),
    name: new FormControl(''),
    dni: new FormControl(''),
    price: new FormControl(null),
    fecha: new FormControl(null),
    hora: new FormControl(null),
    doctor: new FormControl(null),
    tipo:new FormControl('Oftalmologia'),
    facultad: new FormControl(null),
    soldUnits: new FormControl(null),
  });

  user = {} as user;
  doctors: string[] = ['Dr. Luis Martinez', 'Dra. Jade Herrera'];

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: Camara_utilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    if (this.cita) {
      this.form.setValue(this.cita);
    } else {
      // Si no hay una cita existente, establece los valores del formulario con los datos del usuario
      this.form.controls.name.setValue(this.user.name);
      this.form.controls.dni.setValue(this.user.dni);
      this.form.controls.soldUnits.setValue(this.user.phone);
      this.form.controls.facultad.setValue(this.user.facultad);

      // Añade los controles restantes si corresponden a los datos del usuario
    }

    this.route.paramMap.subscribe(params => {
      const selectedHour = params.get('hora');
      if (selectedHour) {
        this.form.controls.hora.setValue(selectedHour);
      }
    });
  }
 
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('imagen a cargar')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  submit() {
    if (this.form.valid) {
      this.setNumberInputs();
      this.cita ? this.updateProduct() : this.createCita();
    }
  }

  setNumberInputs() {
    let { soldUnits, price } = this.form.controls;
    if (soldUnits.value) soldUnits.setValue(parseFloat(soldUnits.value));
    if (price.value) price.setValue(parseFloat(price.value));
  }

  async createCita() {
    let path = `Estudiantes/${this.user.uid}/cita_oftalmologia`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    if (this.form.value.image) {
      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);
    }

    delete this.form.value.id;

    this.firebaseSvc.addDocument(path, this.form.value).then(async res => {
      this.utilsSvc.dismissModal({ success: true });

      this.utilsSvc.presentToast({
        message: 'Cita creada exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      });
    }).catch(error => {
      console.log(error);

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

  async updateProduct() {
    let path = `Estudiante/${this.user.uid}/cita_oftalmologia/${this.cita.id}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    if (this.form.value.image !== this.cita.image && this.form.value.image) {
      let dataUrl = this.form.value.image;
      let imagePath = await this.firebaseSvc.getFilepath(this.cita.image);
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);
    }

    delete this.form.value.id;

    this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {
      this.utilsSvc.dismissModal({ success: true });

      this.utilsSvc.presentToast({
        message: 'Cita actualizado exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      });
    }).catch(error => {
      console.log(error);

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
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (selectedDate < today) {
      return { pastDate: true }; 
    }

    return null; 
  }
}
