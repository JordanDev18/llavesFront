export class Usuarios {
  id: number;
  nombre: string;
  apellido: string;
  documento: number;
  email: string;
  password: string;
  id_rol: number;
  estado: boolean;
  seleccionado: boolean; // Propiedad adicional para el estado de selección

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.apellido = '';
    this.documento = 0;
    this.email = '';
    this.password = '';
    this.id_rol = 0;
    this.estado = true;
    this.seleccionado = false; // Valor inicial como no seleccionado
  }
}