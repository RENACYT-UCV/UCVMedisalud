import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el enrutador

@Component({
  selector: 'app-captcha',
  templateUrl: './captchaEstudiante_MS.page.html',
  styleUrls: ['./captchaEstudiante_MS.page.scss'],
})
export class CaptchaPage implements OnInit {
  randomValue: string = '';
  randomValueEntered: string = '';

  constructor(private router: Router) {} // Inyecta el enrutador

  ngOnInit() {
    this.randomValue = this.generateRandomValue();
  }

  generateRandomValue(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 6; // Puedes ajustar la longitud del valor aleatorio aquí

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  validate() {
    if (this.randomValue !== this.randomValueEntered) {
      this.randomValueEntered = '';
      this.randomValue = this.generateRandomValue();
      // Mostrar mensaje de error
      alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
    } else {
      // Redirige al usuario a otra página (por ejemplo, 'dashboard')
      this.router.navigate(['/auth']); // Ajusta la ruta según tu estructura de rutas
    }
  }
  
}
