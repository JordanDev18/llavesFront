import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router){}

  Listar(){
    this.router.navigate(['listar']);
  }

  Nuevo(){
    this.router.navigate(['add']);
  }

  ParamListar(){
    this.router.navigate(['listar-param']);
  }

  NuevoPrestamo(){
    this.router.navigate(['add-param']);
  }

  ListarLlaves(){
    this.router.navigate(['listar-llaves']);
  }

  NuevaLlave(){
    this.router.navigate(['add-llaves']);
  }

  ListarRoles(){
    this.router.navigate(['listar-roles']);
  }

  NuevoRol(){
    this.router.navigate(['add-roles']);
  }

  HistorialPrestamos(){
    this.router.navigate(['historial-prestamos']);
  }
}
