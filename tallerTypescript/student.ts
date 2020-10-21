export class Student {
    nombre: string;
    codigo: number;
    cedula: number;
    edad: number;
    direccion: string;
    telefono: string;

    constructor(pNombre:string, pCodigo: number, pCedula: number, pEdad: number, pDireccion: string, pTelefono: string)
    {
        this.nombre = pNombre;
        this.codigo = pCodigo;
        this.cedula = pCedula;
        this.edad = pEdad;
        this.direccion = pDireccion;
        this.telefono = pTelefono;
    }
}