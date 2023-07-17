import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './Usuario/listar/listar.component';
import { AddComponent } from './Usuario/add/add.component';
import { EditComponent } from './Usuario/edit/edit.component';
import { ListarParamComponent } from './Parametros/listar-param/listar-param.component';
import { AddParamComponent } from './Parametros/add-param/add-param.component';
import { ListarLlavesComponent } from './Llaves/listar-llaves/listar-llaves.component';
import { AddLlavesComponent } from './Llaves/add-llaves/add-llaves.component';
import { EditLlavesComponent } from './Llaves/edit-llaves/edit-llaves.component';
import { ListarRolesComponent } from './Roles/listar-roles/listar-roles.component';
import { AddRolesComponent } from './Roles/add-roles/add-roles.component';
import { EditRolesComponent } from './Roles/edit-roles/edit-roles.component';
import { HistorialPrestamosComponent } from './Parametros/historial-prestamos/historial-prestamos.component';

const routes: Routes = [
  {path:'listar', component:ListarComponent},
  {path:'add', component:AddComponent},
  {path:'edit/:id', component:EditComponent},
  {path:'listar-param', component:ListarParamComponent},
  {path:'add-param', component:AddParamComponent},
  {path:'edit-param/:id', component:EditComponent},
  {path:'listar-llaves', component:ListarLlavesComponent},
  {path:'add-llaves', component:AddLlavesComponent},
  {path:'edit-llaves/:id', component:EditLlavesComponent},
  {path:'listar-roles', component:ListarRolesComponent},
  {path:'add-roles', component:AddRolesComponent},
  {path:'edit-roles/:id', component:EditRolesComponent},
  {path:'historial-prestamos', component:HistorialPrestamosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
