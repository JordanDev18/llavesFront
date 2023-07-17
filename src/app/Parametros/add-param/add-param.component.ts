import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Llaves } from 'src/app/Model/Llaves';
import { Parametros } from 'src/app/Model/Parametros';
import { Roles } from 'src/app/Model/Roles';
import { Usuarios } from 'src/app/Model/Usuarios';
import { ServiceService } from 'src/app/Service/service.service';
import  swal  from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-param',
  templateUrl: './add-param.component.html',
  styleUrls: ['./add-param.component.css']
})
export class AddParamComponent {

  parame:Parametros = new Parametros();
  llaves:Llaves[]= [];
  usuarios: Usuarios[]= [];
  roles: Roles[] = [];
  constructor(private router:Router, private service:ServiceService){}
  
  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerLlaves()
    this.obtenerRoles();
  }

  irALaListaDeParametros(){
    this.router.navigate(['/listar-param']);
    swal.fire('Prestamo Registrado',`El prestamo ha sido registrado con exito`,`success`);
  }

  Guardar(parame:Parametros){
    this.service.createParametro(parame).subscribe(data =>{
      alert("Se agrego con Exito!!");
      this.router.navigate(["listar-param"]);
    })
  }

  addParametro() {
    // Realizar la llamada al servicio para verificar si ya existe un registro en parámetros con la misma llave y estado activo
    this.service.verificarExistenciaParametro(this.parame.id_llave).subscribe(
      (existeParametro: boolean) => {
        if (existeParametro) {
          swal.fire('Error', 'Ya existe un prestamo activo con la misma llave', 'error');
        } else {
          // Realizar el registro del parámetro
          this.parame.estado = true; // Asignar el valor por defecto de estado
  
          // Realizar la llamada al servicio para guardar el parámetro y la actualización de la llave
          const guardarParametro$ = this.service.createParametro(this.parame);
          const actualizarLlave$ = this.service.actualizarEstadoLlave(this.parame.id_llave, true);
  
          forkJoin([guardarParametro$, actualizarLlave$]).subscribe(
            ([parametroRespuesta, llaveRespuesta]) => {
              console.log('Registro de parámetro:', parametroRespuesta);
              console.log('Actualización de llave:', llaveRespuesta);
              this.irALaListaDeParametros();
            },
            error => console.log(error)
          );
        }
      },
      error => console.log(error)
    );
  }

    //Lógica para obtener la lista de roles desde tu servicio
    obtenerRoles(): void {
      this.service.obtenerListadoDeRoles().subscribe(data => {
        this.roles = data;
      });
    }

    obtenerLlaves() {
      this.service.obtenerListadoDeLlaves().subscribe(data => {
        this.llaves = data;
      });
    }
  
    obtenerUsuarios() {
      this.service.getUsuarios().subscribe(data => {
        this.usuarios = data;
      });
    }
    
    obtenerNombreRol(id: number): string {
      const rol = this.roles.find(rol => rol.id === id);
      return rol && rol.tipoRol ? rol.tipoRol : '';
    }
    obtenerNombreLlave(id: number): string {
      const llave = this.llaves.find(llave => llave.id === id);
      return llave && llave.ambiente ? llave.ambiente : '';
    }
    obtenerNombreUsuario(id: number): string {
      const usu = this.usuarios.find(usu => usu.id === id);
      return usu && usu.nombre ? usu.nombre : '';
    }
}
