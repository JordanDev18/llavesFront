import { Component } from '@angular/core';
import { Llaves } from 'src/app/Model/Llaves';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-llaves',
  templateUrl: './listar-llaves.component.html',
  styleUrls: ['./listar-llaves.component.css']
})
export class ListarLlavesComponent {

  llaves: Llaves[] = [];
  displayedColumns: string[] = ['select', 'id', 'ambiente', 'piso', 'estado', 'acciones'];
  registrosSeleccionados: Llaves[] = [];

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.obtenerLlaves();
  }

  obtenerLlaves() {
    this.service.obtenerListadoDeLlaves().subscribe(data => {
      this.llaves = data;
    });
  }

  deleteLlave(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminarlo?',
      text: 'Confirma si deseas eliminar la Llave',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminala!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.deleteLlave(id).subscribe(dato => {
          console.log(dato);
          this.obtenerLlaves();
        });
      }
    });
  }

  masterToggle() {
    this.isAllSelected() ?
      this.registrosSeleccionados = [] :
      this.registrosSeleccionados = [...this.llaves];
  }

  isAllSelected() {
    return this.registrosSeleccionados.length === this.llaves.length;
  }

  seleccionarRegistro(llave: Llaves) {
    const index = this.registrosSeleccionados.findIndex(r => r.id === llave.id);
    if (index > -1) {
      this.registrosSeleccionados.splice(index, 1);
    } else {
      this.registrosSeleccionados.push(llave);
    }
  }
  cambiarEstado(llaves: Llaves[]) {
    llaves.forEach((llave: Llaves) => {
      if (llave && llave.id) {
        const nuevoEstado = !llave.estado; // Cambiar el estado
  
        // Lógica para actualizar el estado de la llave en la base de datos o en la lógica de negocio
        this.service.actualizarEstadoLlave(llave.id, nuevoEstado).subscribe(
          (response) => {
            llave.estado = nuevoEstado; // Actualizar el estado en el objeto llave
            console.log('Estado actualizado:', response);
            Swal.fire('Cambio de Estado Registrado', 'El estado ha sido cambiado con éxito!', 'success');
          },
          (error) => {
            console.error('Error al actualizar el estado de la llave:', error);
            Swal.fire('Error', 'Hubo un error al cambiar el estado de la llave.', 'error');
          }
        );
      } else {
        console.error('La llave o el ID no están definidos:', llaves);
      }
    });
  }
  
  eliminarRegistros() {
    // Verificar si hay registros seleccionados
    if (this.registrosSeleccionados.length > 0) {
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
        if (result.value) {
          // Eliminar los registros llamando al servicio
          this.registrosSeleccionados.forEach((registro: Llaves) => {
            if (registro && registro.id) {
              this.service.deleteLlave(registro.id).subscribe(
                () => {
                  // Eliminar el registro de la lista
                  this.llaves = this.llaves.filter(u => u !== registro);
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
  
          // Reiniciar la selección
          this.registrosSeleccionados = [];
        }
      });
    }
  }
}
  