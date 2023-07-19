import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

import { ServiceService } from 'src/app/Service/service.service';
import { Usuarios } from '../../Model/Usuarios';
import { Roles } from 'src/app/Model/Roles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  usuarios: MatTableDataSource<Usuarios> = new MatTableDataSource<Usuarios>();
  displayedColumns: string[] = ['select', 'id', 'nombre', 'apellido', 'documento', 'email', 'rol', 'estado', 'acciones'];
  selection = new SelectionModel<Usuarios>(true, []);
  registrosSeleccionados: Usuarios[] = [];
  hayRegistrosSeleccionados: boolean = false;

  roles: Roles[] = [];

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerRoles();
  }

  obtenerUsuarios(): void {
    this.service.getUsuarios().subscribe(data => {
      this.usuarios.data = data;
    });
  }

  obtenerRoles(): void {
    this.service.obtenerListadoDeRoles().subscribe(data => {
      this.roles = data;
    });
  }

  obtenerNombreRol(id: number): string {
    const rol = this.roles.find(rol => rol.id === id);
    return rol && rol.tipoRol ? rol.tipoRol : '';
  }

  actualizarActor(id: number): void {
    this.router.navigate(['edit', id]);
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.usuarios.data.forEach(row => this.selection.select(row));
    }
    this.actualizarRegistrosSeleccionados();
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.usuarios.data.length;
    return numSelected === numRows;
  }

  seleccionarRegistro(usuario: Usuarios): void {
    this.selection.toggle(usuario);
    this.actualizarRegistrosSeleccionados();
  }

  private actualizarRegistrosSeleccionados(): void {
    this.registrosSeleccionados = this.selection.selected;
    this.hayRegistrosSeleccionados = this.registrosSeleccionados.length > 0;
  }

  cambiarEstado(usuarios: Usuarios[]): void {
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

  eliminarRegistros(): void {
    // Verificar si hay registros seleccionados
    if (this.registrosSeleccionados.length > 0) {
      // Mostrar un cuadro de diálogo de confirmación antes de eliminar los registros
      Swal.fire({
        title: '¿Estás seguro de eliminar los registros seleccionados?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Eliminar los registros llamando al servicio
          this.registrosSeleccionados.forEach((registro: Usuarios) => {
            if (registro && registro.id) {
              this.service.deleteUsuario(registro.id).subscribe(
                () => {
                  // Eliminar el registro de la lista
                  this.usuarios.data = this.usuarios.data.filter(u => u !== registro);
                  this.selection.clear(); // Limpiar la selección después de eliminar los registros
                  this.actualizarRegistrosSeleccionados(); // Actualizar los registros seleccionados
                  Swal.fire('Eliminados', 'Los registros seleccionados han sido eliminados con éxito.', 'success');
                },
                (error) => {
                  console.error('Error al eliminar el registro:', error);
                }
              );
            } else {
              console.warn('El registro no tiene un ID definido:', registro);
            }
          });
        }
      });
    }
  }
}
