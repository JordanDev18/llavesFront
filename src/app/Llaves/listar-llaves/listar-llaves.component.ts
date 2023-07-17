import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Llaves } from 'src/app/Model/Llaves';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-llaves',
  templateUrl: './listar-llaves.component.html',
  styleUrls: ['./listar-llaves.component.css']
})
export class ListarLlavesComponent {

  llaves:Llaves[]= [];
  registrosSeleccionados: Llaves[] = [];
  hayRegistrosSeleccionados: boolean = false;

  constructor(private service:ServiceService, private router: Router){}

  ngOnInit() {
    this.obtenerLlaves()
  }

  obtenerLlaves() {
    this.service.obtenerListadoDeLlaves().subscribe(data => {
      this.llaves = data;
    });
  }

  deleteLlave(id:number){
      Swal.fire({
        title: '¿Estás seguro de elimnarlo?',
        text: 'Confirma si deseas eliminar la Llave',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminala!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if(result.value){
          this.service.deleteLlave(id).subscribe(dato => {
          console.log(dato);
          this.obtenerLlaves();
        });
        }
      })
  }

  cambiarEstado(llaves: Llaves[]) {
    llaves.forEach((llave: Llaves) => {
      if (llave && llave.id) {
        const nuevoEstado = !llave.estado; // Cambiar el estado
    
        // Lógica para actualizar el estado del usuario en tu base de datos o en tu lógica de negocio
        this.service.actualizarEstadoLlave(llave.id, nuevoEstado).subscribe(
          (response) => {
            // Éxito: El estado del usuario se ha actualizado correctamente
            llave.estado = nuevoEstado; // Actualizar el estado en el objeto usuario
            llave.seleccionado = false; // Establecer seleccionado como false
            console.log('Estado de la actualizado:', response);
            Swal.fire('Cambio de Estado Registrado', 'El estado ha sido cambiado con éxito!', 'success');
          },
          (error) => {
            // Error: Manejar el error en caso de fallo en la actualización
            console.error('Error al actualizar el estado de la llave:', error);
            Swal.fire('Error', 'Hubo un error al cambiar el estado de la.', 'error');
          }
        );
      } else {
        console.error('El usuario o el ID no están definidos:', llaves);
      }
    });
  }

  seleccionarRegistro(llave: Llaves) {
    llave.seleccionado = !llave.seleccionado;
    this.registrosSeleccionados = this.llaves.filter((u) => u.seleccionado);
    this.hayRegistrosSeleccionados = this.registrosSeleccionados.length > 0;
  }

  evitarDobleClic(event: MouseEvent) {
    event.stopPropagation();
  }

  eliminarRegistros() {
    // Verificar si hay registros seleccionados
    if (this.registrosSeleccionados.length > 0) {
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
  
      // Reiniciar la selección y desactivar el botón
      this.llaves.forEach((llave: Llaves) => {
        llave.seleccionado = false;
      });
      this.registrosSeleccionados = [];
      this.hayRegistrosSeleccionados = false;
    }
  }
}
