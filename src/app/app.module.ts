import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarComponent } from './Usuario/listar/listar.component';
import { AddComponent } from './Usuario/add/add.component';
import { EditComponent } from './Usuario/edit/edit.component';
import { FormsModule } from '@angular/forms';
import { ServiceService } from './Service/service.service';
import { HttpClientModule } from '@angular/common/http';
import { ListarParamComponent } from './Parametros/listar-param/listar-param.component';
import { AddParamComponent } from './Parametros/add-param/add-param.component';
import { EditParamComponent } from './Parametros/edit-param/edit-param.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { ListarRolesComponent } from './Roles/listar-roles/listar-roles.component';
import { AddRolesComponent } from './Roles/add-roles/add-roles.component';
import { EditRolesComponent } from './Roles/edit-roles/edit-roles.component';
import { ListarLlavesComponent } from './Llaves/listar-llaves/listar-llaves.component';
import { AddLlavesComponent } from './Llaves/add-llaves/add-llaves.component';
import { EditLlavesComponent } from './Llaves/edit-llaves/edit-llaves.component';
import { HistorialPrestamosComponent } from './Parametros/historial-prestamos/historial-prestamos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    AddComponent,
    EditComponent,
    ListarParamComponent,
    AddParamComponent,
    EditParamComponent,
    NavbarComponent,
    ListarRolesComponent,
    AddRolesComponent,
    EditRolesComponent,
    ListarLlavesComponent,
    AddLlavesComponent,
    EditLlavesComponent,
    HistorialPrestamosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
