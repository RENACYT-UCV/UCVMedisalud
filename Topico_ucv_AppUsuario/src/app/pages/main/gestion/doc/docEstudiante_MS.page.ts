import { Component, OnInit, inject } from '@angular/core';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { Router } from '@angular/router';
import { where } from 'firebase/firestore';
import { DoctorService } from 'src/app/services/doctor_service';




@Component({
  selector: 'app-doc-psicologia',
  templateUrl: './docEstudiante_MS.page.html',
  styleUrls: ['./docEstudiante_MS.page.scss'],
})
export class DocPage implements OnInit {
  
  // Inyectar el servicio de Firebase
  firebaseSvc = inject(FirebaseEDTService);
  router = inject(Router);
  
  // Array para almacenar los doctores
  doctores: any[] = [];
  
  constructor() { }
  ngOnInit() {
    // Cargar doctores al inicializar
    this.getDoctores();
  }

  // Método para obtener doctores de Firestore
  getDoctores() {
    // Consulta para obtener doctores con especialidad 'Psicologia'
    const path = 'user';
    const collectionQuery = [
      where('especialidad', '==', 'Psicologia'),
      where('role', '==', 'admin')
    ];
    
    this.firebaseSvc.getCollecitionData(path, collectionQuery).subscribe(data => {
      console.log('Doctores:', data);
      this.doctores = data;
    });
  }
doctor: any[] = [];

seleccionarDoctor(nombre: string) {
  console.log('Doctor seleccionado:', nombre);
  // Aquí puedes hacer algo con el nombre: guardarlo, navegar, etc.
}
  // Método para navegar a la página de horarios con el ID del doctor
  irAHorario(doctor: any) {
    this.router.navigate(['main/gestion/doc/horario'], {
      queryParams: { doctorId: doctor.id, doctorNombre: doctor.name }
    });
  }
}
