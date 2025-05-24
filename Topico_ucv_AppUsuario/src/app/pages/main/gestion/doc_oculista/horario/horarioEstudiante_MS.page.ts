import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { where } from '@angular/fire/firestore';

@Component({
  selector: 'app-horario-oculista',
  templateUrl: '../../doc_oculista/horario/horarioEstudiante_MS.page.html',
  styleUrls: ['../../doc_oculista/horario/horarioEstudiante_MS.page.html'],
})
export class HorarioPage implements OnInit {
  
  // Propiedades para almacenar la información del doctor
  doctorId: string;
  doctorInfo: any = {};
  
  // Inyectar servicios necesarios
  private activatedRoute = inject(ActivatedRoute);
  private firebaseSvc = inject(FirebaseEDTService);

  constructor() { }

  ngOnInit() {
    // Obtener el ID del doctor de los parámetros de la URL
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['doctorId']) {
        this.doctorId = params['doctorId'];
        this.getDoctorInfo(this.doctorId);
      }
    });
  }

  // Método para obtener la información del doctor desde Firestore
  getDoctorInfo(doctorId: string) {
    const path = 'user';
    const collectionQuery = [
      where('uid', '==', doctorId)
    ];
    
    this.firebaseSvc.getCollecitionData(path, collectionQuery).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.doctorInfo = data[0];
          console.log('Información del doctor:', this.doctorInfo);
        } else {
          console.error('No se encontró información del doctor');
          this.doctorInfo = {
            name: 'No disponible',
            especialidad: 'No disponible',
            phone: 'No disponible',
            email: 'No disponible',
            direccion: 'Universidad Cesar Vallejo'
          };
        }
      },
      (error) => {
        console.error('Error al obtener información del doctor:', error);
        this.doctorInfo = {
          name: 'Error de carga',
          especialidad: 'No disponible',
          phone: 'No disponible',
          email: 'No disponible',
          direccion: 'Universidad Cesar Vallejo'
        };
      }
    );
  }
}
