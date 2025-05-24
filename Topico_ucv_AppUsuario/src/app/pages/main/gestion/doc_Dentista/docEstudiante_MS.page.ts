import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/* import { DoctorService } from 'src/app/services/doctor_services'; */


@Component({
  selector: 'app-doc-dentista',
  templateUrl: './docEstudiante_MS.page.html',
  styleUrls: ['./docEstudiante_MS.page.scss'],
})
export class DocPage implements OnInit {
   
  
     constructor(
         private router: Router, private route: ActivatedRoute,
         /* private doctorService: DoctorService */
        ) { }
      seleccionarDoctor(doctor: string) {
/*  this.doctorService.setDoctorSeleccionado('dentista', doctor); */
   this.router.navigate(['horario'], { relativeTo: this.route });
        }
        ngOnInit() {
        }

}
