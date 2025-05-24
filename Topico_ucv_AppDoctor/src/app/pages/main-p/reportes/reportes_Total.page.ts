import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { orderBy, where, query, collectionGroup, getFirestore, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { Cita } from 'src/app/models/cita.model';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';

@Component({
  selector: 'app-reportes_Total',
  templateUrl: './reportes_Total.page.html',
  styleUrls: ['./reportes_Total.page.scss'],
})
export class Reportes_TotalPage implements OnInit, OnDestroy {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(Camara_utilsService);

  citas: Cita[] = [];
  loading: boolean = false;

  private unsubscribeCitas: Unsubscribe | null = null;

  // Cerrar sesión
  singOut() {
    this.firebaseSvc.sigOut();
  }

  citaEstado(cita: Cita): string {
    const fechaCita = new Date(`${cita.date}T${cita.time}:00`);
    const now = new Date();
    return fechaCita < now ? 'Cita Concluida' : 'Cita Pendiente';
  }

  citaEstadoColor(cita: Cita): string {
    const fechaCita = new Date(`${cita.date}T${cita.time}:00`);
    const now = new Date();
    return fechaCita < now ? 'danger' : 'success';
  }

  ngOnInit() {}

  ngOnDestroy() {
    // Cancelar la suscripción al destruir el componente para evitar fugas de memoria
    if (this.unsubscribeCitas) {
      this.unsubscribeCitas();
    }
  }

  user(): user {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.getProducts();
      event.target.complete();
    }, 1000);
  }

  // Obtener citas de hoy
  getCitasHoy(): Cita[] {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return this.citas.filter(cita => {
      const fechaCita = new Date(cita.date);
      fechaCita.setHours(0, 0, 0, 0);
      return fechaCita.getTime() === hoy.getTime();
    });
  }

  // Obtener todas las citas
  getProducts() {
    this.loading = true;
    const user = this.utilsSvc.getFromLocalStorage('user');

    const citasQuery = query(
      collectionGroup(getFirestore(), 'cita'),
      where('doctor', '==', user.name),
      orderBy('date', 'desc')
    );

    // Si ya existe una suscripción activa, la cancelamos antes de crear una nueva
    if (this.unsubscribeCitas) {
      this.unsubscribeCitas();
    }

    this.unsubscribeCitas = onSnapshot(citasQuery, (querySnapshot) => {
      const citas: Cita[] = [];
      querySnapshot.forEach((doc) => {
        citas.push(doc.data() as Cita);
      });
      this.citas = citas;
      this.loading = false;
    }, (error) => {
      console.error('Error obteniendo citas:', error);
      this.loading = false;
    });
  }

}
