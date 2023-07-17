import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import baserUrl from './helper'
import { Usuarios } from '../Model/Usuarios';
import { Observable, tap } from 'rxjs';
import { Roles } from '../Model/Roles';
import { Parametros } from '../Model/Parametros';
import { Llaves } from '../Model/Llaves';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  obtenerListadoDeActores():Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${baserUrl}/usuarios/buscar`);
  }

  obtenerListadoDeRoles():Observable<Roles[]> {
    return this.http.get<Roles[]>(`${baserUrl}/roles/buscar`);
  }

  obtenerListadoDeLlaves():Observable<Llaves[]> {
    return this.http.get<Llaves[]>(`${baserUrl}/llaves/buscar`);
  }

  obtenerListadoDeParametros():Observable<Parametros[]> {
    return this.http.get<Parametros[]>(`${baserUrl}/parametros/buscar`);
  }

  getUsuarios(){
    return this.http.get<Usuarios[]>(`${baserUrl}/usuarios/buscar`);
  }

  getUsuarioId(id:number){
    return this.http.get<Usuarios[]>(`${baserUrl}/usuarios/buscar/`+id).pipe(
      tap((data: any) => console.log(data))
    );
  }

  getParametroId(id:number){
    return this.http.get<Parametros[]>(`${baserUrl}/parametros/buscar/`+id).pipe(
      tap((data: any) => console.log(data))
    );
  }

  getLlaveId(id:number){
    return this.http.get<Llaves[]>(`${baserUrl}/llaves/buscar/`+id).pipe(
      tap((data: any) => console.log(data))
    );
  }

  getRolId(id:number){
    return this.http.get<Roles[]>(`${baserUrl}/roles/buscar/`+id).pipe(
      tap((data: any) => console.log(data))
    );
  }

  createUsuario(usuario: Usuarios){
    return this.http.post<Usuarios[]>(`${baserUrl}/usuarios/guardar`, usuario);
  }

  createParametro(parame: Parametros){
    return this.http.post<Parametros[]>(`${baserUrl}/parametros/guardar`, parame);
  }

  createLlave(llave: Llaves){
    return this.http.post<Llaves[]>(`${baserUrl}/llaves/guardar`, llave);
  }

  createRol(rol: Roles){
    return this.http.post<Roles[]>(`${baserUrl}/roles/guardar`, rol);
  }

  updateUsuario(id:number, usuario: Usuarios): Observable<Object>{
    return this.http.put<Usuarios>(`${baserUrl}/usuarios/actualizar/${id}`, usuario);
  }
  
  updateParametro(id:number, param: Parametros): Observable<Object>{
    return this.http.put<Parametros>(`${baserUrl}/parametros/actualizar/${id}`, param);
  }

  updateLlave(id:number, llave: Llaves): Observable<Object>{
    return this.http.put<Llaves>(`${baserUrl}/llaves/actualizar/${id}`, llave);
  }

  updateRol(id:number, rol: Roles): Observable<Object>{
    return this.http.put<Roles>(`${baserUrl}/roles/actualizar/${id}`, rol);
  }

  deleteUsuario(id: number) {
    return this.http.delete<Usuarios>(`${baserUrl}/usuarios/eliminar/` + id);
  }  

  deleteParametro(id:number): Observable<Object>{
    return this.http.delete(`${baserUrl}/parametros/eliminar/${id}`);
  }

  deleteLlave(id:number): Observable<Object>{
    return this.http.delete(`${baserUrl}/llaves/eliminar/${id}`);
  }

  deleteRol(id:number): Observable<Object>{
    return this.http.delete(`${baserUrl}/roles/eliminar/${id}`);
  }

  eliminarUsuario(id:number): Observable<Object>{
    return this.http.delete(`${baserUrl}/usuarios/eliminar/${id}`);
  }

  actualizarEstadoParametro(param: Parametros) {
    return this.http.put(`${baserUrl}/parametros/cambiarestado`, param);
  }

  actualizarEstadoUsuario(id: number, nuevoEstado: boolean) {
    const usuario = { id: id, estado: nuevoEstado };
    return this.http.put(`${baserUrl}/usuarios/cambiarestado`, usuario);
  }

  actualizarEstadoLlave(id: number, nuevoEstado: boolean) {
    const llave = { id: id, estado: nuevoEstado };
    return this.http.put(`${baserUrl}/llaves/cambiarestado`, llave);
  }

  actualizarEstadoRol(id: number, nuevoEstado: boolean) {
    const rol = { id: id, estado: nuevoEstado };
    return this.http.put(`${baserUrl}/roles/cambiarestado`, rol);
  }

  verificarExistenciaParametro(id_llave: number): Observable<boolean> {
    return this.http.get<boolean>(`${baserUrl}/parametros/existe/${id_llave}`);
  }
}
