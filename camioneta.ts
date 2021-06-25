class Camioneta extends Vehiculo
{
    cuatroXcuatro:boolean;

    constructor(id:number, marca:string, modelo:string, precio:number,cuatroXcuatro:boolean)
    {
       super(id,marca,modelo,precio);
       this.cuatroXcuatro = cuatroXcuatro;
    }
}