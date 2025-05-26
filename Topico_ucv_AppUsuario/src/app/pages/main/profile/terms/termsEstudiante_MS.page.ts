import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-terms',
  templateUrl: './termsEstudiante_MS.page.html',
  styleUrls: ['./termsEstudiante_MS.page.scss'],
})
export class TermsPage implements OnInit {
  private router = inject(Router);
  private toastController = inject(ToastController);

  constructor() { }

  ngOnInit() {
  }

  /**
   * Maneja la aceptación de términos y condiciones
   * Muestra un toast y redirecciona al perfil
   */
  async aceptarTerminos() {
    // Guardar en localStorage que el usuario aceptó los términos
    localStorage.setItem('terminosAceptados', 'true');
    
    // Mostrar toast de confirmación
    const toast = await this.toastController.create({
      message: 'Has aceptado los términos y condiciones',
      duration: 2000,
      position: 'bottom',
      color: 'success',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    
    await toast.present();

    // Redirigir después de mostrar el toast
    setTimeout(() => {
      this.router.navigate(['/main/profile']);
    }, 2000);
  }
}
