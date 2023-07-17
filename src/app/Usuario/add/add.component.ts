import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/Model/Roles';
import { Usuarios } from 'src/app/Model/Usuarios';
import { ServiceService } from 'src/app/Service/service.service';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{

  usuario : Usuarios =  new Usuarios();
  roles: Roles[] = [];
  
  constructor(private router:Router, private service:ServiceService){}
  
  ngOnInit(): void {
    this.obtenerRoles();
  }

  Guardar(usuario:Usuarios){
    this.service.createUsuario(usuario).subscribe(data =>{
      alert("Se agrego con Exito!!");
      this.router.navigate(["listar"]);
    })
  }

  irALaListaDeUsuarios(){
    this.router.navigate(['/listar']);
    swal.fire('Usuario Registrado',`El Usuario ha sido registrado con exito`,`success`);
  }

  addUsuario(){
    console.log(this.usuario);
    this.usuario.estado = true; // Asignar el valor por defecto de estado
    this.service.createUsuario(this.usuario).subscribe(dato => 
      {console.log(dato);},error => console.log(error));
    this.irALaListaDeUsuarios();
  }

  //Lógica para obtener la lista de roles desde tu servicio
  obtenerRoles(): void {
    this.service.obtenerListadoDeRoles().subscribe(data => {
      this.roles = data;
    });
  }
  
  obtenerNombreRol(id: number): string {
    const rol = this.roles.find(rol => rol.id === id);
    return rol && rol.tipoRol ? rol.tipoRol : '';
  }
  
}
