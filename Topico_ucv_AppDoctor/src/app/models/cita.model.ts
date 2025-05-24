export interface Cita {
  name: string;          // "name"
  phone: string;         // "phone"
  price: number | null;  // "price" puede ser null
  dni: string;           // "dni"
  image: string;         // "image"
  date: string;          // "date" en la bd es string "2025-05-23"
  age: string;           // "age" es string "18"
  time: string;          // "time" es string "08:00"
  doctor: string;        // "doctor"
  facultad: string;      // "facultad"
  email: string;         // "email"
  type: string;          // "type"
  id: string;            // id del documento Firestore, no está en la imagen pero usualmente se usa
  estado?: string;       // "estado" no aparece en la imagen, lo dejo opcional
  day?: string;          // "day" está en la BD, es string "Sábado", lo agrego opcional
}
