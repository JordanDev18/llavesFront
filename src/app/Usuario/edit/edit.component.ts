import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from 'src/app/Model/Usuarios';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: number;
  usuario: Usuarios = new Usuarios();

  constructor(
    private router: Router,
    private service: ServiceService,
    private route: ActivatedRoute
  ) {this.id= 0}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getUsuarioId(this.id).subscribe(dato => {
      this.usuario = dato;
    }, error => console.log(error));
  }

  onSubmit() {
    this.service.updateUsuario(this.id,this.usuario).subscribe(data => {
      console.log(data);
      alert("Se actualizó con éxito!");
      this.router.navigate(['/listar']); // Redirigir a la lista después de actualizar
    }, error => console.log(error));
  }
}