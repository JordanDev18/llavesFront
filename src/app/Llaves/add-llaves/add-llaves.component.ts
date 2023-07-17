import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Llaves } from 'src/app/Model/Llaves';
import { ServiceService } from 'src/app/Service/service.service';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-add-llaves',
  templateUrl: './add-llaves.component.html',
  styleUrls: ['./add-llaves.component.css']
})
export class AddLlavesComponent {

  llave:Llaves = new Llaves();

  constructor(private router:Router, private service:ServiceService){}
  

  Guardar(llave:Llaves){
    this.service.createLlave(llave).subscribe(data =>{
      alert("Se agrego con Exito!!");
      this.router.navigate(["listar"]);
    })
  }

  irALaListaDeLlaves(){
    this.router.navigate(['/listar-llaves']);
    swal.fire('Llave Registrada',`La llave ha sido registrado con exito`,`success`);
  }

  addLlave(){
    console.log(this.llave);
    this.llave.estado = true; // Asignar el valor por defecto de estado
    this.service.createLlave(this.llave).subscribe(dato => 
      {console.log(dato);},error => console.log(error));
    this.irALaListaDeLlaves();
  }
}
