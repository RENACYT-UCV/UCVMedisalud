import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctoresSeleccionados: { [especialidad: string]: string } = {};

  setDoctorSeleccionado(especialidad: string, doctor: string) {
    this.doctoresSeleccionados[especialidad] = doctor;
  }

  getDoctorSeleccionado(especialidad: string): string | undefined {
    return this.doctoresSeleccionados[especialidad];
  }
}