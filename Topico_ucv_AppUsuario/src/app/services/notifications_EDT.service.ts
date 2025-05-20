import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsEDTService {

  constructor() {
    this.initializePushNotifications();
  }

  initializePushNotifications() {
    // Solicitar permiso para usar notificaciones push
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Registrar el dispositivo para notificaciones push
        PushNotifications.register();
      } else {
        // Manejar caso en que el usuario no otorgue permisos
        console.log('User denied permissions to receive notifications');
      }
    });

    // Evento disparado cuando se recibe una notificación push
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    // Evento disparado cuando se abre una notificación push
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );

    // Evento disparado cuando el registro del dispositivo es exitoso
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
      }
    );

    // Evento disparado en caso de error durante el registro del dispositivo
    PushNotifications.addListener('registrationError',
      (error) => {
        console.error('Error on registration: ' + JSON.stringify(error));
      }
    );
  }
}
