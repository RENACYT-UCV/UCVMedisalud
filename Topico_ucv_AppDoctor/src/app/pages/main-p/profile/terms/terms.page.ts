import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';

@Component({
  selector: 'app-terms-doctor',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  private toastController = inject(ToastController);
  private router = inject(Router);
  private utilsSvc = inject(Camara_utilsService);

  constructor() { }

  ngOnInit() {
  }

  /**
   * Maneja la acción de aceptar los términos y condiciones
   * Muestra un mensaje toast y redirecciona al perfil
   */
  async aceptarTerminos() {
    // Guardar en localStorage que el usuario aceptó los términos
    this.utilsSvc.saveInLocalStorage('terminosAceptados', true);
    
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
      this.router.navigate(['/main-p/profile']);
    }, 2000);
  }
}
