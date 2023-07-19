import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { Roles } from 'src/app/Model/Roles';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.css']
})
export class ListarRolesComponent {

  roles: Roles[] = [];
  displayedColumns: string[] = ['select', 'id', 'tipoRol', 'estado'];
  selection = new SelectionModel<Roles>(true, []);
  registrosSeleccionados: Roles[] = [];

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.obtenerRoles();
  }

  obtenerRoles() {
    this.service.obtenerListadoDeRoles().subscribe(data => {
      this.roles = data;
    });
  }

  eliminarRol(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminarlo?',
      text: 'Confirma si deseas eliminar el Rol',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteRol(id).subscribe(() => {
          this.obtenerRoles();
          Swal.fire('Eliminado', 'El rol ha sido eliminado con éxito.', 'success');
        });
      }
    });
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.roles.forEach((row) => this.selection.select(row));
    }
    this.actualizarRegistrosSeleccionados();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.roles.length;
    return numSelected === numRows;
  }

  seleccionarRegistro(rol: Roles) {
    this.selection.toggle(rol);
    this.actualizarRegistrosSeleccionados();
  }

  private actualizarRegistrosSeleccionados() {
    this.registrosSeleccionados = this.selection.selected;
  }

  cambiarEstado() {
    const registros = this.selection.selected;

    if (registros.length > 0) {
      registros.forEach((rol: Roles) => {
        const nuevoEstado = !rol.estado;

        this.service.actualizarEstadoRol(rol.id, nuevoEstado).subscribe(
          (response) => {
            rol.estado = nuevoEstado;
            this.selection.clear();
            this.actualizarRegistrosSeleccionados();
            Swal.fire('Cambio de Estado Registrado', 'El estado ha sido cambiado con éxito.', 'success');
          },
          (error) => {
            console.error('Error al actualizar el estado del rol:', error);
            Swal.fire('Error', 'Hubo un error al cambiar el estado del rol.', 'error');
          }
        );
      });
    }
  }

  eliminarRegistros() {
    const registros = this.selection.selected;

    if (registros.length > 0) {
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
          registros.forEach((rol: Roles) => {
            this.service.deleteRol(rol.id).subscribe(() => {
              this.roles = this.roles.filter(r => r !== rol);
              this.selection.deselect(rol);
              this.actualizarRegistrosSeleccionados();
            });
          });
          Swal.fire('Eliminados', 'Los registros seleccionados han sido eliminados con éxito.', 'success');
        }
      });
    }
  }
}
