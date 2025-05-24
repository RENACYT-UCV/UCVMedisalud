import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import {
  orderBy,
  where,
  query,
  collectionGroup,
  getFirestore,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { Cita } from 'src/app/models/cita.model';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';

// Importaciones para generación de PDF
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-CP',
  templateUrl: './CP.page.html',
  styleUrls: ['./CP.page.scss'],
})
export class CPPage implements OnInit, OnDestroy {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(Camara_utilsService);

  citas: Cita[] = [];
  loading = false;

  // Manejador para cancelar la suscripción de Firestore
  private unsubscribeCitas: Unsubscribe | null = null;

  /**
   * Cierra la sesión del usuario actual
   */
  singOut() {
    this.firebaseSvc.sigOut();
  }

  /**
   * Determina si una cita está concluida o pendiente según la fecha actual
   * @param cita - Objeto cita a evaluar
   * @returns Cadena con el estado de la cita ("Cita Concluida" o "Cita Pendiente")
   */
  citaEstado(cita: Cita): string {
    const fechaCita = new Date(`${cita.date}T${cita.time}:00`);
    const now = new Date();
    return fechaCita < now ? 'Cita Concluida' : 'Cita Pendiente';
  }

  /**
   * Devuelve el color para el indicador de estado según el estado de la cita
   * @param cita - Objeto cita a evaluar
   * @returns Color para el indicador ('danger' para concluidas, 'success' para pendientes)
   */
  citaEstadoColor(cita: Cita): string {
    const fechaCita = new Date(`${cita.date}T${cita.time}:00`);
    const now = new Date();
    return fechaCita < now ? 'danger' : 'success';
  }

  /**
   * Filtra las citas pendientes (futuras) de la lista completa
   * @returns Array de citas pendientes
   */
  getCitasPendientes(): Cita[] {
    const now = new Date();
    return this.citas.filter((cita) => {
      const fechaCita = new Date(`${cita.date}T${cita.time}:00`);
      return fechaCita >= now;
    });
  }

  ngOnInit() {
    // Inicialización del componente (opcional cargar citas aquí)
  }

  /**
   * Cancela la suscripción a Firestore al destruir el componente
   */
  ngOnDestroy() {
    if (this.unsubscribeCitas) {
      this.unsubscribeCitas();
    }
  }

  /**
   * Obtiene el usuario actual desde el almacenamiento local
   * @returns Objeto usuario o null si no está disponible
   */
  user(): user | null {
    return this.utilsSvc.getFromLocalStorage('user') ?? null;
  }

  /**
   * Carga las citas cuando se entra en la vista
   */
  ionViewWillEnter() {
    this.getProducts();
  }

  /**
   * Maneja el evento de actualización por pull-to-refresh
   * @param event - Evento de actualización de Ionic
   */
  doRefresh(event: any) {
    setTimeout(() => {
      this.getProducts();
      event.target.complete();
    }, 1000);
  }

  /**
   * Filtra las citas programadas para el día actual
   * @returns Array de citas para hoy
   */
  getCitasHoy(): Cita[] {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return this.citas.filter((cita) => {
      if (!cita.date) return false;
      const fechaCita = new Date(cita.date);
      fechaCita.setHours(0, 0, 0, 0);
      return fechaCita.getTime() === hoy.getTime();
    });
  }

  /**
   * Obtiene las citas del doctor actual desde Firestore
   * Establece una suscripción en tiempo real para actualizar automáticamente
   */
  private getProducts() {
    this.loading = true;

    const user = this.user();

    if (!user || !user.name) {
      // Si no hay información de usuario, cancelar la operación
      this.loading = false;
      return;
    }

    // Consulta Firestore por todas las citas asignadas al doctor actual
    const citasQuery = query(
      collectionGroup(getFirestore(), 'cita'),
      where('doctor', '==', user.name),
      orderBy('date', 'desc')
    );

    // Cancelar suscripción anterior si existe
    if (this.unsubscribeCitas) {
      this.unsubscribeCitas();
    }

    // Establecer suscripción en tiempo real a la consulta
    this.unsubscribeCitas = onSnapshot(
      citasQuery,
      (querySnapshot) => {
        const citas: Cita[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Cita;
          citas.push(data);
        });

        this.citas = citas;
        this.loading = false;
      },
      (error) => {
        // Manejo silencioso de errores
        this.loading = false;
      }
    );
  }

  /**
   * Filtra las citas pendientes para la próxima semana
   * @returns Array de citas para los próximos 7 días
   */
  getCitasPendientesSemanales(): Cita[] {
    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);

    return this.citas.filter((cita) => {
      const fechaCita = new Date(`${cita.date}T${cita.time}:00`);
      return fechaCita >= now && fechaCita <= oneWeekLater;
    });
  }

  /**
   * Genera un reporte PDF con las citas pendientes para la próxima semana
   * y lo abre en una nueva ventana/pestaña
   */
  generarReporteCitasPendientesSemanales() {
    const citasPendientesSemanales = this.getCitasPendientesSemanales();

    const pdfDefinition = {
      content: [
        { text: 'Reporte de Citas Pendientes Semanales', style: 'header' },
        { text: '\n' },
        ...citasPendientesSemanales.map((cita) => [
          {
            text: 'Fecha: ' + new Date(cita.date).toLocaleDateString(),
            style: 'subheader',
          },
          { text: 'Hora: ' + cita.time },
          { text: 'DNI: ' + cita.dni },
          { text: 'Nombre Paciente: ' + cita.name },
          { text: 'Estado: ' + this.citaEstado(cita) },
          { text: '\n' },
        ]),
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      },
    };

    pdfMake.createPdf(pdfDefinition).open();
  }
}
