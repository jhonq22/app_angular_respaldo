import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterinventario'
})
export class FilterinventarioPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args){
      return value;
    }
    return value.filter((val) => {
      const rVal =
         (val.centro_salud.toLocaleLowerCase().includes(args)) 
      || (val.servicio_medico.toLocaleLowerCase().includes(args))
      || (val.equipo.toLocaleLowerCase().includes(args))
     // || (val.marca.toLocaleLowerCase().includes(args))
      // || (val.modelo.toLocaleLowerCase().includes(args))
      || (val.serial.toLocaleLowerCase().includes(args))
      || (val.numero_bien_nacional.toLocaleLowerCase().includes(args))
     // || (val.fecha_instalacion.toLocaleLowerCase().includes(args))
      || (val.estatu_equipo.toLocaleLowerCase().includes(args));

      return rVal;
    });

  }

}
