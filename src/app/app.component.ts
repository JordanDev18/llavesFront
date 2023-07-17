import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Control de Llaves';
  i = 0;

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
}
