
// doctor_service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private doctorSeleccionado: any = null;

  setDoctorSeleccionado(doctor: any) {
    this.doctorSeleccionado = doctor;
    localStorage.setItem('doctorSeleccionado', JSON.stringify(doctor));
  }

  getDoctorSeleccionado(): any {
    const data = localStorage.getItem('doctorSeleccionado');
    return data ? JSON.parse(data) : null;
  }
}