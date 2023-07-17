import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Llaves } from 'src/app/Model/Llaves';
import { Parametros } from 'src/app/Model/Parametros';
import { Roles } from 'src/app/Model/Roles';
import { Usuarios } from 'src/app/Model/Usuarios';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial-prestamos',
  templateUrl: './historial-prestamos.component.html',
  styleUrls: ['./historial-prestamos.component.css']
})
export class HistorialPrestamosComponent {
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

  registrosSeleccionados: number[] = [];

  hayRegistrosSeleccionados: boolean = false;

  evitarDobleClic(event: MouseEvent) {
    event.stopPropagation();
  }

  seleccionarRegistro(param: any) {
    param.seleccionado = !param.seleccionado;
    this.hayRegistrosSeleccionados = this.param.some((p: any) => p.seleccionado);
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
