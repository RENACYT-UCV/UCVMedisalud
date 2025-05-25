export interface Cita_Estructura{
  name: string,
  soldUnits: number,
  price: number,
  dni: string,
  image: string,
  date: Date,
  edad: string,
  hora: String,
  time?: String, // Campo opcional para compatibilidad
  doctor: string,
  facultad: string,
  email: string,
  tipo: string,
  type?: string, // Campo opcional para filtrar por especialidad
  id: string,
  estado: string;
  phone?: string; // Campo opcional para compatibilidad con teléfono
}
