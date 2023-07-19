import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { Parametros } from 'src/app/Model/Parametros';
import { Roles } from 'src/app/Model/Roles';
import { Usuarios } from 'src/app/Model/Usuarios';
import { Llaves } from 'src/app/Model/Llaves';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-param',
  templateUrl: './listar-param.component.html',
  styleUrls: ['./listar-param.component.css']
})
export class ListarParamComponent {
  
  param: Parametros[] = [];
  usuarios: Usuarios[] = [];
  roles: Roles[] = [];
  llaves: Llaves[] = [];
  displayedColumns: string[] = ['select', 'id', 'id_llave', 'id_usuario', 'rol', 'estadoLlave', 'estado', 'acciones'];
  selection = new SelectionModel<Parametros>(true, []);
  
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.obtenerParametros();
    this.obtenerUsuarios();
    this.obtenerLlaves();
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

  obtenerRoles() {
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
    const usuario = this.usuarios.find(usuario => usuario.id === id);
    return usuario && usuario.nombre ? usuario.nombre : '';
  }
  
  obtenerRolUsuario(id: number): number {
    const usuario = this.usuarios.find(usuario => usuario.id === id);
    return usuario && usuario.id_rol ? usuario.id_rol : 0;
  }

  eliminarParametro(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminarlo?',
      text: 'Confirma si deseas eliminar el Prestamo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteParametro(id).subscribe(dato => {
          console.log(dato);
          this.obtenerParametros();
        });
      }
    });
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.param.forEach(row => this.selection.select(row));
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.param.length;
    return numSelected === numRows;
  }

  seleccionarRegistro(param: Parametros) {
    this.selection.toggle(param);
    this.hayRegistrosSeleccionados = this.selection.selected.length > 0;
  }
  
  hayRegistrosSeleccionados: boolean = false;
  
  cambiarEstado() {
    this.selection.selected.forEach((param) => {
      this.guardarEstadoParametro(param);
    });
  }
  
  guardarEstadoParametro(param: Parametros) {
    const nuevoEstado = !param.estado; // Cambiar el estado
    const nuevoEstadoLlave = 'devuelta'; // Cambiar el estado_llave
  
    const parametrosActualizados: Parametros = {
      ...param, // Copiar todas las propiedades del objeto param
      estado: nuevoEstado,
      estadoLlave: nuevoEstadoLlave
    };
  
    // Lógica para actualizar el estado del parámetro en la base de datos o en la lógica de negocio
    this.service.updateParametro(parametrosActualizados.id, parametrosActualizados).subscribe(
      (response) => {
        // Éxito: Actualizar el registro en la base de datos
        console.log('Estado del parámetro actualizado en la base de datos:', response);
        Swal.fire('Cambio de Estado Registrado', 'El estado ha sido cambiado con éxito.', 'success');
      },
      (error) => {
        // Error: Manejar el error en caso de fallo en la actualización
        console.error('Error al actualizar el estado del parámetro:', error);
        Swal.fire('Error', 'Hubo un error al cambiar el estado del parámetro.', 'error');
      }
    );
  }
  
  eliminarRegistros() {
    const registrosSeleccionados = this.selection.selected;
  
    if (registrosSeleccionados.length > 0) {
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
          registrosSeleccionados.forEach((registro: Parametros) => {
            this.service.deleteParametro(registro.id).subscribe(
              () => {
                const index = this.param.indexOf(registro);
                Swal.fire('Registro Eliminado', 'El registro ha sido eliminado con éxito.', 'success');
                if (index !== -1) {
                  this.param.splice(index, 1);
                }
              },
              (error: any) => {
                console.error('Error al eliminar el registro:', error);
              }
            );
          });
  
          this.selection.clear();
          this.hayRegistrosSeleccionados = false;
        }
      });
    }
  }
}