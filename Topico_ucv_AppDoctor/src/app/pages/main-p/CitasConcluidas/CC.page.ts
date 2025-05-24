//REPORTE DE CITAS (SEMANAL - CONCLUIDAS)

import { Component, OnInit, inject } from '@angular/core';
import { orderBy, where } from 'firebase/firestore';
import { Cita } from 'src/app/models/cita.model';
import {
  collectionGroup,
  getFirestore,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { AddUpdateCitaComponent } from 'src/app/shared/components/add-update-cita/add-update-cita.component';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';

@Component({
  selector: 'app-CC',
  templateUrl: './CC.page.html',
  styleUrls: ['./CC.page.scss'],
})
export class CCPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(Camara_utilsService);

  // Cerrar sesión
  singOut() {
    this.firebaseSvc.sigOut();
  }

  citas: Cita[] = [];
  loading: boolean = false;

  citaEstado(cita): string {
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    const now = new Date();
    return fechaCita < now ? 'Cita Concluida' : 'Cita Pendiente';
  }

  citaEstadoColor(cita): string {
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    const now = new Date();
    return fechaCita < now ? 'danger' : 'success';
  }

  getCitasConcluidas() {
    const now = new Date();
    return this.citas.filter((cita) => {
      const fechaCita = new Date(`${cita.date}T${cita.time}:00`);
      return fechaCita < now; // Filtra solo las citas concluidas
    });
  }

  ngOnInit() {}

  user(): user {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getProducts(); // Corrige el llamado a la función
      event.target.complete();
    }, 1000);
  }

  // Obtener citas de hoy
  getCitasHoy() {
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Establece la hora a medianoche para la comparación

    return this.citas.filter((cita) => {
      let fechaCita = new Date(cita.date);
      fechaCita.setHours(0, 0, 0, 0); // Establece la hora a medianoche para la comparación

      return fechaCita.getTime() === hoy.getTime();
    });
  }

  getProducts() {
    this.loading = true;
    const user = this.utilsSvc.getFromLocalStorage('user');

    if (!user?.name) {
      console.error('Usuario no válido.');
      this.loading = false;
      return;
    }

    const citasQuery = query(
      collectionGroup(getFirestore(), 'cita'),
      where('doctor', '==', user.name),
      orderBy('date', 'desc')
    );

    onSnapshot(
      citasQuery,
      (querySnapshot) => {
        const citas: Cita[] = [];
        querySnapshot.forEach((doc) => {
          citas.push(doc.data() as Cita);
        });
        this.citas = citas;
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener citas:', error);
        this.loading = false;
      }
    );
  }
}
