export interface Cita {
  name: string;          // Nombre completo del paciente
  phone: string;         // Número telefónico de contacto
  price: number | null;  // Precio de la consulta (puede ser null)
  dni: string;           // Documento Nacional de Identidad
  image: string;         // URL de la imagen de perfil/documentación
  date: string;          // Fecha de la cita en formato ISO (YYYY-MM-DD)
  age: string;           // Edad del paciente
  time: string;          // Hora de la cita en formato HH:MM
  doctor: string;        // Nombre del médico asignado
  facultad: string;      // Facultad académica del paciente
  email: string;         // Correo electrónico de contacto
  type: string;          // Tipo de consulta médica
  id: string;            // Identificador único en Firestore
  estado?: string;       // Estado actual de la cita (opcional)
  day?: string;          // Día de la semana de la cita (opcional)
}
