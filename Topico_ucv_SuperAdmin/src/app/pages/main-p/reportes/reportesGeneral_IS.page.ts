import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { orderBy } from 'firebase/firestore';
import { collectionGroup, getFirestore, query, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { user_Estructura } from 'src/app/models/user_Estructura.model';
import { Cita_Estructura } from 'src/app/models/cita_Estructura.model';
import { FirebaseService_Datos } from 'src/app/services/firebase_Datos.service';
import { UtilsService_Image } from 'src/app/services/utils_Image.service';

@Component({
  selector: 'app-reportesGeneral_IS',
  templateUrl: './reportesGeneral_IS.page.html',
  styleUrls: ['./reportesGeneral_IS.page.scss'],
})
export class ReportesGeneral_ISPage implements OnInit, OnDestroy {
  firebaseSvc = inject(FirebaseService_Datos);
  utilsSvc = inject(UtilsService_Image);

  citas: Cita_Estructura[] = [];
  citasDentista: Cita_Estructura[] = [];
  citasOculista: Cita_Estructura[] = [];
  citasFisioterapia: Cita_Estructura[] = [];

  loading: boolean = false;

  // Referencias para cancelar listeners
  private unsubscribeCitas?: Unsubscribe;
  private unsubscribeDentista?: Unsubscribe;
  private unsubscribeFisio?: Unsubscribe;
  private unsubscribeOculista?: Unsubscribe;

  ngOnInit() {
    this.getCitasss(); // por si no entra por ionViewWillEnter
  }

  ionViewWillEnter() {
    this.getCitasss();
  }

  ngOnDestroy(): void {
    // Cancelamos los onSnapshot para evitar fugas de memoria
    this.unsubscribeCitas?.();
    this.unsubscribeDentista?.();
    this.unsubscribeFisio?.();
    this.unsubscribeOculista?.();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getCitasss();
      event.target.complete();
    }, 1000);
  }

  singOut() {
    this.firebaseSvc.sigOut();
  }

  user(): user_Estructura {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  citaEstado(cita: Cita_Estructura): string {
    const fechaCita = new Date(`${cita.date}T${cita.hora}:00`);
    const now = new Date();
    return fechaCita < now ? 'Cita Concluida' : 'Cita Pendiente';
  }

  citaEstadoColor(cita: Cita_Estructura): string {
    const fechaCita = new Date(`${cita.date}T${cita.hora}:00`);
    const now = new Date();
    return fechaCita < now ? 'danger' : 'success';
  }

  getCitasHoy(): Cita_Estructura[] {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return this.citas.filter(cita => {
      const fechaCita = new Date(cita.date);
      fechaCita.setHours(0, 0, 0, 0);
      return fechaCita.getTime() === hoy.getTime();
    });
  }

  getCitasss() {
    this.loading = true;

    const db = getFirestore();

    const citasQuery = query(collectionGroup(db, 'cita'), orderBy('date', 'desc'));
    const citasDentistaQuery = query(collectionGroup(db, 'cita_dentista'), orderBy('date', 'desc'));
    const citasFisioterapiaQuery = query(collectionGroup(db, 'cita_fisioterapia'), orderBy('date', 'desc'));
    const citasOculistaQuery = query(collectionGroup(db, 'cita_oculista'), orderBy('date', 'desc'));

    // General
    this.unsubscribeCitas = onSnapshot(citasQuery, (querySnapshot) => {
      const citas: Cita_Estructura[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Cita general:', data);
        citas.push(data as Cita_Estructura);
      });
      this.citas = citas;
      this.loading = false;
    }, (error) => {
      console.error('Error al cargar citas generales:', error);
      this.loading = false;
    });

    // Dentista
    this.unsubscribeDentista = onSnapshot(citasDentistaQuery, (querySnapshot) => {
      const citas: Cita_Estructura[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Cita dentista:', data);
        citas.push(data as Cita_Estructura);
      });
      this.citasDentista = citas;
    }, (error) => {
      console.error('Error al cargar citas dentista:', error);
    });

    // Fisioterapia
    this.unsubscribeFisio = onSnapshot(citasFisioterapiaQuery, (querySnapshot) => {
      const citas: Cita_Estructura[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Cita fisio:', data);
        citas.push(data as Cita_Estructura);
      });
      this.citasFisioterapia = citas;
    }, (error) => {
      console.error('Error al cargar citas fisio:', error);
    });

    // Oculista
    this.unsubscribeOculista = onSnapshot(citasOculistaQuery, (querySnapshot) => {
      const citas: Cita_Estructura[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Cita oculista:', data);
        citas.push(data as Cita_Estructura);
      });
      this.citasOculista = citas;
    }, (error) => {
      console.error('Error al cargar citas oculista:', error);
    });
  }
}
