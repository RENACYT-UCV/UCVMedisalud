import { Component, OnInit, inject } from '@angular/core';
import { orderBy } from 'firebase/firestore';
import { Cita } from 'src/app/models/cita.model';
import { user_ETD } from 'src/app/models/user.model';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';
import { AddUpdateCitaEstudianteMSComponent } from 'src/app/shared/components/add-update-cita/add-update-citaEstudiante_MS.component';

@Component({
  selector: 'app-cita-concluida',
  templateUrl: './cita-concluidaEstudiante_MS.page.html',
  styleUrls: ['./cita-concluidaEstudiante_MS.page.scss'],
})
export class CitaConcluidaPage implements OnInit {

  citas: Cita[] = [];
  loading: boolean = false;
  placeholders: number[] = Array(7).fill(1); // Define placeholders as an array of numbers

  firebaseSvc = inject(FirebaseEDTService);
  utilsSvc = inject(UtilsEDTService);

  ngOnInit() {
    this.getCitas();
  }

  ionViewWillEnter() {
    this.getCitas();
  }

  user(): user_ETD {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  async doRefresh(event: any) {
    await this.getCitas();
    event.target.complete();
  }

  getCitasHoy(): Cita[] {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return this.citas.filter(cita => {
      const fechaCita = new Date(cita.fec);
      fechaCita.setHours(0, 0, 0, 0);
      return fechaCita.getTime() === hoy.getTime();
    });
  }

  getCitas() {
    const path1 = `Estudiantes/${this.user().uid}/cita`;
    const path2 = `Estudiantes/${this.user().uid}/cita_dentista`;
    this.loading = true;

    const now = new Date();

    this.firebaseSvc.getCollecitionData(path1, [orderBy('fecha', 'desc')]).subscribe((citas1: Cita[]) => {
      this.firebaseSvc.getCollecitionData(path2, [orderBy('fecha', 'desc')]).subscribe((citas2: Cita[]) => {
        this.citas = [...citas1, ...citas2].filter(cita => new Date(`${cita.fec}T${cita.tim}:00`) < now);
        this.loading = false;
      }, (error: any) => {
        console.error(error);
        this.loading = false;
      });
    }, (error: any) => {
      console.error(error);
      this.loading = false;
    });
  }

  citaEstado(cita: Cita): string {
    const fechaCita = new Date(`${cita.fec}T${cita.tim}:00`);
    const now = new Date();
    return fechaCita < now ? 'Cita Concluida' : 'Cita Pendiente';
  }

  citaEstadoColor(cita: Cita): string {
    const fechaCita = new Date(`${cita.fec}T${cita.tim}:00`);
    const now = new Date();
    return fechaCita < now ? 'danger' : 'success';
  }

 
  getCitaFields(cita: Cita): { label: string, value: any }[] {
    return [
      { label: 'Nombre', value: cita.nom },
      { label: 'DNI', value: cita.identific },
      { label: 'Teléfono', value: cita.sold },
      { label: 'Fecha', value: cita.fec },
      { label: 'Hora', value: cita.tim },
      { label: 'Doctor', value: cita.med },
      { label: 'Dia', value: cita.di },
      { label: 'Facultad', value: cita.carre },
      { label: 'Correo', value: cita.hotm },
      { label: 'Especialidad', value: cita.tip },
    ];
  }
}