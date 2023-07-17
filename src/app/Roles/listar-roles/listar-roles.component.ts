import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/Model/Roles';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.css']
})
export class ListarRolesComponent {

  roles: Roles[] = []; // Donde Rol es el tipo de objeto para tus roles
  registrosSeleccionados: Roles[] = [];
  hayRegistrosSeleccionados: boolean = false;

  constructor(private service:ServiceService, private router: Router){}

  ngOnInit() {
    this.obtenerRoles();
  }

  // Lógica para obtener la lista de roles desde tu servicio
  obtenerRoles(): void {
    this.service.obtenerListadoDeRoles().subscribe(data => {
      this.roles = data;
    });
  }

  eliminarRol(id:number){
    Swal.fire({
      title: '¿Estás seguro de elimnarlo?',
      text: 'Confirma si deseas eliminar el Rol',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if(result.value){
        this.service.deleteRol(id).subscribe(dato => {
        console.log(dato);
        this.obtenerRoles();
      });
      }
    })
  }

  cambiarEstado(roles: Roles[]) {
    roles.forEach((rol: Roles) => {
      if (rol && rol.id) {
        const nuevoEstado = !rol.estado; // Cambiar el estado
    
        // Lógica para actualizar el estado del usuario en tu base de datos o en tu lógica de negocio
        this.service.actualizarEstadoRol(rol.id, nuevoEstado).subscribe(
          (response) => {
            // Éxito: El estado del usuario se ha actualizado correctamente
            rol.estado = nuevoEstado; // Actualizar el estado en el objeto usuario
            rol.seleccionado = false; // Establecer seleccionado como false
            console.log('Estado de la actualizado:', response);
            Swal.fire('Cambio de Estado Registrado', 'El estado ha sido cambiado con éxito!', 'success');
          },
          (error) => {
            // Error: Manejar el error en caso de fallo en la actualización
            console.error('Error al actualizar el estado del rol:', error);
            Swal.fire('Error', 'Hubo un error al cambiar el estado de la.', 'error');
          }
        );
      } else {
        console.error('El usuario o el ID no están definidos:', roles);
      }
    });
  }

  seleccionarRegistro(rol: Roles) {
    rol.seleccionado = !rol.seleccionado;
    this.registrosSeleccionados = this.roles.filter((u) => u.seleccionado);
    this.hayRegistrosSeleccionados = this.registrosSeleccionados.length > 0;
  }

  evitarDobleClic(event: MouseEvent) {
    event.stopPropagation();
  }

  eliminarRegistros() {
    // Verificar si hay registros seleccionados
    if (this.registrosSeleccionados.length > 0) {
      // Eliminar los registros llamando al servicio
      this.registrosSeleccionados.forEach((registro: Roles) => {
        if (registro && registro.id) {
          this.service.deleteRol(registro.id).subscribe(
            () => {
              // Eliminar el registro de la lista
              this.roles = this.roles.filter(u => u !== registro);
              Swal.fire('Registro Eliminado', 'El registro ha sido eliminado con éxito!', 'success');
            },
            (error: any) => {
              console.error('Error al eliminar el registro:', error);
            }
          );
        } else {
          console.warn('El registro no tiene un ID definido:', registro);
        }
      });
  
      // Reiniciar la selección y desactivar el botón
      this.roles.forEach((llave: Roles) => {
        llave.seleccionado = false;
      });
      this.registrosSeleccionados = [];
      this.hayRegistrosSeleccionados = false;
    }
  }
}
