export class Parametros {
  id: number;
  id_llave: number;
  id_usuario: number;
  estadoLlave: string;
  estado: boolean;
  seleccionado: boolean; // Propiedad adicional para el estado de selección

  constructor() {
    this.id = 0;
    this.id_llave = 0;
    this.id_usuario = 0;
    this.estadoLlave = '';
    this.estado = true;
    this.seleccionado = false; // Valor inicial como no seleccionado
  }
  }