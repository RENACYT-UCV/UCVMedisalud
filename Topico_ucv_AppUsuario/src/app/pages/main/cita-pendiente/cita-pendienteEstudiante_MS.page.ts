import { Component, OnInit, inject } from '@angular/core';
import { orderBy } from 'firebase/firestore';
import { Cita } from 'src/app/models/cita.model';
import { user_ETD } from 'src/app/models/user.model';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';
import { AddUpdateCitaEstudianteMSComponent } from 'src/app/shared/components/add-update-cita/add-update-citaEstudiante_MS.component';

@Component({
  selector: 'app-cita-pendiente',
  templateUrl: './cita-pendienteEstudiante_MS.page.html',
  styleUrls: ['./cita-pendienteEstudiante_MS.page.scss'],
})
export class CitaPendientePage implements OnInit {

  citas: Cita[] = [];
  loading: boolean = false;
  placeholders: number[] = Array(7).fill(1);

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
      const fechaCita = new Date(cita.date);
      fechaCita.setHours(0, 0, 0, 0);
      return fechaCita.getTime() === hoy.getTime();
    });
  }

  getCitas() {
    const path1 = `Estudiantes/${this.user().uid}/cita`;
    const path2 = `Estudiantes/${this.user().uid}/cita_dentista`;
    this.loading = true;

    const now = new Date();

    this.firebaseSvc.getCollecitionData(path1, [orderBy('date', 'desc')]).subscribe((citas1: Cita[]) => {
      this.firebaseSvc.getCollecitionData(path2, [orderBy('date', 'desc')]).subscribe((citas2: Cita[]) => {
        this.citas = [...citas1, ...citas2].filter(cita => new Date(`${cita.date}T${cita.time}:00`) >= now);
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

  getCitaFields(cita: Cita): { label: string, value: any }[] {
    return [
      { label: 'Nombre', value: cita.name },
      { label: 'DNI', value: cita.dni },
      { label: 'Teléfono', value: cita.phone },
      { label: 'Fecha', value: cita.date },
      { label: 'Hora', value: cita.time },
      { label: 'Doctor', value: cita.doctor },
      { label: 'Día', value: cita.day },
      { label: 'Facultad', value: cita.facultad },
      { label: 'Correo', value: cita.email },
      { label: 'Especialidad', value: cita.type },
    ];
  }
}
