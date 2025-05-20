import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input-estudiante-ms',
  templateUrl: './custom-inputEstudiante_MS.component.html',
  styleUrls: ['./custom-inputEstudiante_MS.component.scss'],
})
export class CustomInputEstudianteMSComponent  implements OnInit {
  //inputs para recibir parametros
  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;


  isPassword!: boolean;
  hide: boolean = true;


  constructor() { }

  //agregamos una condicion
  ngOnInit() {
    if(this.type == 'password') this.isPassword= true;
  }


  showOrHidePassword(){
    this.hide = !this.hide;
    if(this.hide) this.type ='password';
    else this.type ='text';
  }
}


