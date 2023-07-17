export class Llaves {
    id:number;
    ambiente?:string;
    piso?:number;
    estado: boolean;
    seleccionado: boolean; // Propiedad adicional para el estado de selección

    constructor() {
        this.id = 0;
        this.estado = true;
        this.seleccionado = false; // Valor inicial como no seleccionado
      }
}