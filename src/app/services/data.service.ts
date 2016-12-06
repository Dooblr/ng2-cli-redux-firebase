import {Injectable} from '@angular/core';
import {Subject, Observable} from "rxjs/Rx";
import {select, NgRedux} from "ng2-redux/lib/index";
import {IAppState} from "../store/index";
declare var firebase:any
declare var Array:any

@Injectable()
export class DataService {

  // this isn't state, but a utility generated /by/ state,
  // so I'm keeping it here rather than the store.
  quantityNumbers = []
  @select([ 'data', 'maxQuantity' ]) maxQuantity$: Observable<number>

  constructor(private redux:NgRedux<IAppState>){
    this.maxQuantity$
      .subscribe((value: any) => {
        this.fillQuantityNumbers(value)
      });
  }

  fillQuantityNumbers(quantity){ // e.g. stateful service call:
    this.quantityNumbers = Array(quantity).fill(0).map((e,i)=>i+1)
  }

  //removes item from array
  remove(arr, item) {
    for(var i = arr.length; i--;) {
      if(arr[i] === item) {
        arr.splice(i, 1);
      }
    }
  }

  // get number of properties/aka size of
  // an object filled with objects
  size(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
      }
      return size;
  }

  hasValue(obj, key, value) {
    return obj.hasOwnProperty(key) && obj[key] === value;
  }

  findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }
}
