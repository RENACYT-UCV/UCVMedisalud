import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestionEstudiante_MS.page.html',
  styleUrls: ['./gestionEstudiante_MS.page.scss'],
})
export class GestionPage implements OnInit {
 

  transactions: any[] = [
    {id: 1, vendor: 'Turno Mañana', image: '',  time: '7:00AM - 12:00 PM'},
    {id: 2, vendor: 'Turno Tarde', image: '', time: '1:00PM - 9:00 PM'}
  ];

   constructor(
        
         ) { }
  
         
         ngOnInit() {
         }

}
