import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterusuario'
})
export class FilterusuarioPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args){
      return value;
    }
    return value.filter((val) => {
      const rVal =
         (val.name.toLocaleLowerCase().includes(args))
      || (val.email.toLocaleLowerCase().includes(args))
      || (val.ente.toLocaleLowerCase().includes(args));

      return rVal;
    });

  }

}
