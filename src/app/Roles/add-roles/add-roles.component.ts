import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/Model/Roles';
import { ServiceService } from 'src/app/Service/service.service';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css']
})
export class AddRolesComponent {
  rol:Roles = new Roles();

  constructor(private router:Router, private service:ServiceService){}
  

  Guardar(rol:Roles){
    this.service.createRol(rol).subscribe(data =>{
      alert("Se agrego con Exito!!");
      this.router.navigate(["listar-roles"]);
    })
  }

  irALaListaDeRoles(){
    this.router.navigate(['/listar-roles']);
    swal.fire('Rol Registrado',`El Rol ha sido registrado con exito`,`success`);
  }

  addRol(){
    console.log(this.rol);
    this.rol.estado = true; // Asignar el valor por defecto de estado
    this.service.createRol(this.rol).subscribe(dato => 
      {console.log(dato);},error => console.log(error));
    this.irALaListaDeRoles();
  }
}
