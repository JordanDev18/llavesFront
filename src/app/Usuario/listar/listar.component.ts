import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceService } from 'src/app/Service/service.service';
import { Usuarios } from '../../Model/Usuarios';
import { Roles } from 'src/app/Model/Roles';
import Swal from 'sweetalert2';
import  swal  from 'sweetalert2';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {

  usuarios: Usuarios[]= [];
  i = 0;
  roles: Roles[] = []; // Donde Rol es el tipo de objeto para tus roles
  registrosSeleccionados: Usuarios[] = [];
  hayRegistrosSeleccionados: boolean = false;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerRoles();
  }

  obtenerUsuarios() {
    this.service.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  obtenerRoles() {
    this.service.obtenerListadoDeRoles().subscribe(data => {
      this.roles = data;
    });
  }

  obtenerNombreRol(id: number): string {
    const rol = this.roles.find(rol => rol.id === id);
    return rol && rol.tipoRol ? rol.tipoRol : '';
  }

  Editar(usuario: Usuarios):void {
    if (typeof usuario !== 'undefined' && typeof usuario.id !== 'undefined') {
      localStorage.setItem("id", usuario.id.toString());
      this.router.navigate(['edit']);
    } else {
      console.error("La propiedad 'id' de 'usuarios' es undefined.");
    }
  }

  actualizarActor(id:number){
    this.router.navigate(['edit',id]);
  }

  editarUsuario(usuario: Usuarios): void {
    if (usuario && usuario.id) {
      localStorage.setItem('id', usuario.id.toString());
      this.router.navigate(['edit']);
    } else {
      console.error('El usuario o el ID no están definidos:', usuario);
    }
  }

  eliminarUsuario(usuario: Usuarios) {
    if (usuario && usuario.id) {
      Swal.fire({
        title: '¿Estás seguro de eliminarlo?',
        text: 'Confirma si deseas eliminar al usuario',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          this.service.eliminarUsuario(usuario.id).subscribe(
            () => {
              this.usuarios = this.usuarios.filter(u => u !== usuario);
              Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
            },
            (error) => {
              console.error('Error al eliminar el usuario:', error);
              Swal.fire('Error', 'Hubo un error al eliminar el usuario.', 'error');
            }
          );
        }
      });
    } else {
      console.error('El usuario o el ID no están definidos:', usuario);
    }
  }

  cambiarEstado(usuarios: Usuarios[]) {
    usuarios.forEach((usuario: Usuarios) => {
      if (usuario && usuario.id) {
        const nuevoEstado = !usuario.estado; // Cambiar el estado
    
        // Lógica para actualizar el estado del usuario en tu base de datos o en tu lógica de negocio
        this.service.actualizarEstadoUsuario(usuario.id, nuevoEstado).subscribe(
          (response) => {
            // Éxito: El estado del usuario se ha actualizado correctamente
            usuario.estado = nuevoEstado; // Actualizar el estado en el objeto usuario
            usuario.seleccionado = false; // Establecer seleccionado como false
            console.log('Estado del usuario actualizado:', response);
            Swal.fire('Cambio de Estado Registrado', 'El estado ha sido cambiado con éxito!', 'success');
          },
          (error) => {
            // Error: Manejar el error en caso de fallo en la actualización
            console.error('Error al actualizar el estado del usuario:', error);
            Swal.fire('Error', 'Hubo un error al cambiar el estado del usuario.', 'error');
          }
        );
      } else {
        console.error('El usuario o el ID no están definidos:', usuario);
      }
    });
  }
   

  seleccionarRegistro(usuario: Usuarios) {
    usuario.seleccionado = !usuario.seleccionado;
    this.registrosSeleccionados = this.usuarios.filter((u) => u.seleccionado);
    this.hayRegistrosSeleccionados = this.registrosSeleccionados.length > 0;
  }

  evitarDobleClic(event: MouseEvent) {
    event.stopPropagation();
  }

  eliminarRegistros() {
    // Verificar si hay registros seleccionados
    if (this.registrosSeleccionados.length > 0) {
      // Eliminar los registros llamando al servicio
      this.registrosSeleccionados.forEach((registro: Usuarios) => {
        if (registro && registro.id) {
          this.service.deleteUsuario(registro.id).subscribe(
            () => {
              // Eliminar el registro de la lista
              this.usuarios = this.usuarios.filter(u => u !== registro);
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
      this.usuarios.forEach((usuario: Usuarios) => {
        usuario.seleccionado = false;
      });
      this.registrosSeleccionados = [];
      this.hayRegistrosSeleccionados = false;
    }
  }
  
}
