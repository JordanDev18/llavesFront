import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Llaves } from 'src/app/Model/Llaves';
import { Parametros } from 'src/app/Model/Parametros';
import { Roles } from 'src/app/Model/Roles';
import { Usuarios } from 'src/app/Model/Usuarios';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-listar-param',
  templateUrl: './listar-param.component.html',
  styleUrls: ['./listar-param.component.css']
})
export class ListarParamComponent {
  
  param:Parametros[] = [];
  usuarios: Usuarios[]= [];
  roles: Roles[] = []; // Donde Rol es el tipo de objeto para tus roles
  llaves:Llaves[]= [];

  constructor(private service:ServiceService, private router: Router){}

  ngOnInit() {
    this.obtenerParametros();
    this.obtenerUsuarios();
    this.obtenerLlaves()
    this.obtenerRoles();
  }
  obtenerParametros() {
    this.service.obtenerListadoDeParametros().subscribe(data => {
      this.param = data;
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

  // Lógica para obtener la lista de roles desde tu servicio
  obtenerRoles(): void {
    this.service.obtenerListadoDeRoles().subscribe(data => {
      this.roles = data;
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
  obtenerRolUsuario(id: number): number {
    const usu = this.usuarios.find(usu => usu.id === id);
    return usu && usu.id_rol ? usu.id_rol : 0;
  }

  eliminarParametro(id:number){
    Swal.fire({
      title: '¿Estás seguro de elimnarlo?',
      text: 'Confirma si deseas eliminar el Prestamo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if(result.value){
        this.service.deleteParametro(id).subscribe(dato => {
        console.log(dato);
        this.obtenerParametros();
      });
      }
    })
  }

  registrosSeleccionados: any[] = [];

  cambiarEstado() {
    this.registrosSeleccionados.forEach((param) => {
      this.guardarEstadoParametro(param);
    });
  }
  
  seleccionarRegistro(param: any) {
    param.seleccionado = !param.seleccionado;
    this.registrosSeleccionados = this.param.filter((p) => p.seleccionado);
    this.hayRegistrosSeleccionados = this.registrosSeleccionados.length > 0;
  }
  
  hayRegistrosSeleccionados: boolean = false;
  
  evitarDobleClic(event: MouseEvent) {
    event.stopPropagation();
  }
  
  registroSeleccionadoId: number | null = null;

  guardarEstadoParametro(param: Parametros) {
    param.estado = !param.estado; // Cambiar el estado localmente
    param.estadoLlave = 'devuelta'; // Cambiar el estado_llave localmente
  
    this.service.updateParametro(param.id, param).subscribe(
      (response) => {
        // Éxito: Actualizar el registro en la base de datos
        console.log('Estado del parámetro actualizado en la base de datos:', response);
        swal.fire('Cambio de Estado Registrado',`La llave ha sido devuelta con exito, podra ver el prestamo en el historial!`,`success`);
      },
      (error) => {
        // Error: Manejar el error en caso de fallo en la actualización
        console.error('Error al actualizar el estado del parámetro:', error);
      }
    );
  }
  
  eliminarRegistros() {
    // Obtener los registros seleccionados
    const registrosSeleccionados = this.param.filter((param: any) => param.seleccionado);
    // Verificar si hay registros seleccionados
    if (registrosSeleccionados.length > 0) {
      // Eliminar los registros llamando al servicio
      registrosSeleccionados.forEach((registro: any) => {
        this.service.deleteParametro(registro.id).subscribe(
          () => {
            // Eliminar el registro de la lista
            const index = this.param.indexOf(registro);
            Swal.fire('Registro Eliminado', 'El registro ha sido eliminado con éxito!', 'success');
            if (index !== -1) {
              this.param.splice(index, 1);
            }
          },
          (error: any) => {
            console.error('Error al eliminar el registro:', error);
          }
        );
      });
      
      // Reiniciar la selección y desactivar el botón
      this.param.forEach((param: any) => {
        param.seleccionado = false;
      });
      this.hayRegistrosSeleccionados = false;
    }
  }
  
}
