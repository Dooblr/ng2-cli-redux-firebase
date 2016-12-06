import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(ninjas: any, term: any): any{
    // if search term is undefined, return everything
    if (term === undefined) return ninjas;
    // return updated ninjas array
    return ninjas.filter(function(ninja){
      return ninja.name.toLowerCase().includes(term.toLowerCase())
    })
  }
}
