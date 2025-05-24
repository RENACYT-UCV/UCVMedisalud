import { Component, OnInit } from '@angular/core';
/* import { DoctorService } from 'src/app/services/doctor_services'; */
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doc-fisio',
  templateUrl: './docEstudiante_MS.page.html',
  styleUrls: ['./docEstudiante_MS.page.scss'],
})
export class DocPage implements OnInit {

     constructor(
        private router: Router, private route: ActivatedRoute,
        /* private doctorService: DoctorService */
       ) { }
     seleccionarDoctor(doctor: string) {
/* this.doctorService.setDoctorSeleccionado('fisioterapia', doctor); */
  this.router.navigate(['horario'], { relativeTo: this.route });
       }
       ngOnInit() {
       }

}
