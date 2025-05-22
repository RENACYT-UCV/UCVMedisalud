export interface Cita{
  id: string;             // Unique ID of the appointment
  name: string;           // Nombre del estudiante
  phone: number;          // Teléfono del estudiante
  price: number;          // Costo de la cita
  dni: string;            // DNI del estudiante
  image: string;          // Foto del estudiante o evidencia
  age: string;            // Edad del estudiante
  time: string;           // Hora de la cita
  doctor: string;         // Doctor asignado
  facultad: string;       // Facultad del estudiante
  email: string;          // Correo electrónico
  type: string;           // Tipo de cita (ej. "Oculista")
  date: Date;             // Fecha de la cita
  day: string;            // Día de la semana
}
