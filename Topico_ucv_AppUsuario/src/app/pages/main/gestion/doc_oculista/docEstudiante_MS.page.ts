import { Component, OnInit } from '@angular/core';
/* import { DoctorService } from 'src/app/services/doctor_services'; */
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doc-oculista',
  templateUrl: './docEstudiante_MS.page.html',
  styleUrls: ['./docEstudiante_MS.page.scss'],
})
export class DocPage implements OnInit {

 constructor(
          private router: Router, private route: ActivatedRoute,
          /* private doctorService: DoctorService */
         ) { }
       seleccionarDoctor(doctor: string) {
  /* this.doctorService.setDoctorSeleccionado('oculista', doctor); */
    this.router.navigate(['horario'], { relativeTo: this.route });
         }
         ngOnInit() {
         }
}
     
    
