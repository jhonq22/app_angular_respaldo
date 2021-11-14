import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtercentrosalud'
})
export class FiltercentrosaludPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args){
      return value;
    }
    return value.filter((val) => {
      const rVal =
         (val.centro_salud.toLocaleLowerCase().includes(args))
      || (val.direccion.toLocaleLowerCase().includes(args))
      
      || (val.rif.toLocaleLowerCase().includes(args))
      || (val.contacto_tlf.toLocaleLowerCase().includes(args))
      || (val.contacto_email.toLocaleLowerCase().includes(args))
      || (val.estado.toLocaleLowerCase().includes(args));

      return rVal;
    });

  }


}
